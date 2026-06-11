import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function upsertStatus(domain: string, code: string, name: string, sortOrder: number, description?: string) {
  return prisma.masterStatus.upsert({
    where: { domain_code: { domain, code } },
    update: { name, sortOrder, description, isActive: true },
    create: { domain, code, name, sortOrder, description, isActive: true },
  });
}

async function main() {
  const activeUserStatus = await upsertStatus('user', 'ACTIVE', 'Activo', 10, 'Usuario habilitado para ingresar al sistema');
  await upsertStatus('user', 'INACTIVE', 'Inactivo', 20, 'Usuario deshabilitado');
  await upsertStatus('general', 'ACTIVE', 'Activo', 10, 'Registro activo');
  await upsertStatus('general', 'INACTIVE', 'Inactivo', 20, 'Registro inactivo');
  await upsertStatus('order', 'DRAFT', 'Borrador', 10, 'Estado de referencia para otros módulos');
  await upsertStatus('order', 'PENDING_PAYMENT', 'Pendiente de pago', 20, 'Estado base para módulo de pedidos');

  const permissionRows = [
    ['users.read', 'users', 'read', 'Consultar usuarios'],
    ['users.create', 'users', 'create', 'Crear usuarios'],
    ['users.update', 'users', 'update', 'Actualizar usuarios'],
    ['settings.read', 'settings', 'read', 'Consultar configuraciones'],
    ['settings.update', 'settings', 'update', 'Actualizar configuraciones'],
    ['statuses.read', 'statuses', 'read', 'Consultar estados maestros'],
    ['statuses.create', 'statuses', 'create', 'Crear estados maestros'],
    ['audit.read', 'audit', 'read', 'Consultar auditoría'],
    ['dashboard.read', 'dashboard', 'read', 'Acceder al dashboard base'],
  ];

  for (const [code, module, action, description] of permissionRows) {
    await prisma.permission.upsert({
      where: { code },
      update: { module, action, description },
      create: { code, module, action, description },
    });
  }

  const adminRole = await prisma.role.upsert({
    where: { code: 'ADMIN' },
    update: { name: 'Administrador', description: 'Acceso completo al módulo plataforma', statusId: activeUserStatus.id },
    create: { code: 'ADMIN', name: 'Administrador', description: 'Acceso completo al módulo plataforma', statusId: activeUserStatus.id },
  });

  const operatorRole = await prisma.role.upsert({
    where: { code: 'OPERATOR' },
    update: { name: 'Operador', description: 'Acceso operativo limitado', statusId: activeUserStatus.id },
    create: { code: 'OPERATOR', name: 'Operador', description: 'Acceso operativo limitado', statusId: activeUserStatus.id },
  });

  const allPermissions = await prisma.permission.findMany();
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: permission.id } },
      update: {},
      create: { roleId: adminRole.id, permissionId: permission.id },
    });
  }

  const operatorPermissionCodes = ['dashboard.read', 'statuses.read'];
  const operatorPermissions = await prisma.permission.findMany({ where: { code: { in: operatorPermissionCodes } } });
  for (const permission of operatorPermissions) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: operatorRole.id, permissionId: permission.id } },
      update: {},
      create: { roleId: operatorRole.id, permissionId: permission.id },
    });
  }

  const passwordHash = await bcrypt.hash('Admin123*', 12);
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: { email: 'admin@example.com', fullName: 'Administrador del sistema', statusId: activeUserStatus.id },
    create: {
      username: 'admin',
      email: 'admin@example.com',
      fullName: 'Administrador del sistema',
      passwordHash,
      statusId: activeUserStatus.id,
    },
  });

  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: admin.id, roleId: adminRole.id } },
    update: {},
    create: { userId: admin.id, roleId: adminRole.id },
  });

  await prisma.systemSetting.upsert({
    where: { key: 'APP_NAME' },
    update: { value: 'Portal Comercial MVP', isPublic: true },
    create: { key: 'APP_NAME', value: 'Portal Comercial MVP', valueType: 'string', description: 'Nombre público del sistema', isPublic: true },
  });

  await prisma.systemSetting.upsert({
    where: { key: 'DEFAULT_LOCALE' },
    update: { value: 'es-EC', isPublic: true },
    create: { key: 'DEFAULT_LOCALE', value: 'es-EC', valueType: 'string', description: 'Localización por defecto', isPublic: true },
  });

  console.log('Seed completado: usuario admin / Admin123*');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
