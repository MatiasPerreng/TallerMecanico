-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.42 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.14.0.7165
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for taller_mecanico
CREATE DATABASE IF NOT EXISTS `taller_mecanico` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `taller_mecanico`;

-- Dumping structure for table taller_mecanico.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.cache: ~20 rows (approximately)
INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
	('laravel_cache_2023766a563615a24739df7d09a4f66b', 'i:1;', 1768060826),
	('laravel_cache_2023766a563615a24739df7d09a4f66b:timer', 'i:1768060826;', 1768060826),
	('laravel_cache_282c2a4d8b89f9a86d2a7d15400e0c96', 'i:1;', 1768950022),
	('laravel_cache_282c2a4d8b89f9a86d2a7d15400e0c96:timer', 'i:1768950022;', 1768950022),
	('laravel_cache_38e1fb08a54a4a381bbb85e734453bbf', 'i:1;', 1768949991),
	('laravel_cache_38e1fb08a54a4a381bbb85e734453bbf:timer', 'i:1768949991;', 1768949991),
	('laravel_cache_5a0059d4407e286855cbddda4826046e', 'i:2;', 1769885156),
	('laravel_cache_5a0059d4407e286855cbddda4826046e:timer', 'i:1769885156;', 1769885156),
	('laravel_cache_7f7dbd029be97ddf14209cddfb03e6cd', 'i:1;', 1768950078),
	('laravel_cache_7f7dbd029be97ddf14209cddfb03e6cd:timer', 'i:1768950078;', 1768950078),
	('laravel_cache_86af92beae6e9c1ff11352d4ce502f94', 'i:1;', 1769886345),
	('laravel_cache_86af92beae6e9c1ff11352d4ce502f94:timer', 'i:1769886345;', 1769886345),
	('laravel_cache_aa233161df7f81640a2ea53f47dd19ff', 'i:1;', 1768068304),
	('laravel_cache_aa233161df7f81640a2ea53f47dd19ff:timer', 'i:1768068304;', 1768068304),
	('laravel_cache_c18d2cf23fb209c72abf36c2eb793b5d', 'i:1;', 1769887990),
	('laravel_cache_c18d2cf23fb209c72abf36c2eb793b5d:timer', 'i:1769887990;', 1769887990),
	('laravel_cache_ec499c42673071a6117fbedc1a883078', 'i:3;', 1768060732),
	('laravel_cache_ec499c42673071a6117fbedc1a883078:timer', 'i:1768060732;', 1768060732),
	('laravel_cache_f6487877920f8a934d96bc9c6ce4e052', 'i:2;', 1768013430),
	('laravel_cache_f6487877920f8a934d96bc9c6ce4e052:timer', 'i:1768013430;', 1768013430);

-- Dumping structure for table taller_mecanico.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.cache_locks: ~0 rows (approximately)

-- Dumping structure for table taller_mecanico.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categorias_nombre_unique` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.categorias: ~1 rows (approximately)
INSERT INTO `categorias` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
	(1, 'ACEITES', '2026-01-21 01:50:18', '2026-01-21 01:50:18');

-- Dumping structure for table taller_mecanico.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rut` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `domicilio` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.clientes: ~1 rows (approximately)
INSERT INTO `clientes` (`id`, `nombre`, `email`, `rut`, `telefono`, `domicilio`, `disponible`, `created_at`, `updated_at`) VALUES
	(1, 'Ta Ta', 'cochilocorochimaru@gmail.com', 'N/A', '6545642564', 'N/A', 1, '2026-01-21 01:40:05', '2026-01-21 01:40:05');

-- Dumping structure for table taller_mecanico.estado_neumaticos
CREATE TABLE IF NOT EXISTS `estado_neumaticos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tarea_id` bigint unsigned NOT NULL,
  `delanteros_derechos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `delanteros_izquierdos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `traseros_derechos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `traseros_izquierdos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `estado_neumaticos_tarea_id_foreign` (`tarea_id`),
  CONSTRAINT `estado_neumaticos_tarea_id_foreign` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.estado_neumaticos: ~4 rows (approximately)
INSERT INTO `estado_neumaticos` (`id`, `tarea_id`, `delanteros_derechos`, `delanteros_izquierdos`, `traseros_derechos`, `traseros_izquierdos`, `created_at`, `updated_at`) VALUES
	(1, 1, '0', '0', '0', '0', '2026-01-21 01:47:01', '2026-01-21 01:47:01'),
	(2, 2, '0', '0', '0', '0', '2026-01-21 01:47:33', '2026-01-21 01:47:33'),
	(3, 3, '0', '0', '0', '0', '2026-01-31 21:57:31', '2026-01-31 21:57:31'),
	(4, 4, '0', '0', '0', '0', '2026-01-31 21:57:54', '2026-01-31 21:57:54');

-- Dumping structure for table taller_mecanico.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.failed_jobs: ~0 rows (approximately)

-- Dumping structure for table taller_mecanico.frenos
CREATE TABLE IF NOT EXISTS `frenos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tarea_id` bigint unsigned NOT NULL,
  `delanteros` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `traseros` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `estacionamiento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `numero_cricket` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `frenos_tarea_id_foreign` (`tarea_id`),
  CONSTRAINT `frenos_tarea_id_foreign` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.frenos: ~4 rows (approximately)
INSERT INTO `frenos` (`id`, `tarea_id`, `delanteros`, `traseros`, `estacionamiento`, `numero_cricket`, `created_at`, `updated_at`) VALUES
	(1, 1, '0', '0', '0', '0', '2026-01-21 01:47:01', '2026-01-21 01:47:01'),
	(2, 2, '0', '0', '0', '0', '2026-01-21 01:47:33', '2026-01-21 01:47:33'),
	(3, 3, '0', '0', '0', '0', '2026-01-31 21:57:31', '2026-01-31 21:57:31'),
	(4, 4, '0', '0', '0', '0', '2026-01-31 21:57:54', '2026-01-31 21:57:54');

-- Dumping structure for table taller_mecanico.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.job_batches: ~0 rows (approximately)

-- Dumping structure for table taller_mecanico.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.jobs: ~0 rows (approximately)

-- Dumping structure for table taller_mecanico.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.migrations: ~16 rows (approximately)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_03_30_013946_add_role_to_users_table', 1),
	(5, '2025_04_10_001519_create_personal_access_tokens_table', 1),
	(6, '2025_04_11_235121_create_clientes_table', 1),
	(7, '2025_04_11_235122_create_categorias_table', 1),
	(8, '2025_04_11_235142_create_productos_table', 1),
	(9, '2025_04_11_235155_create_vehiculos_table', 1),
	(10, '2025_04_11_235156_create_formulario_ordenes_table', 1),
	(11, '2025_04_15_131113_create_formulario_tareas_table', 1),
	(12, '2025_04_15_131114_create_tren_delantero_table', 1),
	(13, '2025_04_15_131207_create_tren_trasero_table', 1),
	(14, '2025_04_15_131234_create_frenos_table', 1),
	(15, '2025_04_15_131306_create_estado_neumaticos_table', 1),
	(16, '2025_04_15_235322_create_producto_usados_table', 1);

-- Dumping structure for table taller_mecanico.ordens
CREATE TABLE IF NOT EXISTS `ordens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint unsigned NOT NULL,
  `vehiculo_id` bigint unsigned NOT NULL,
  `detalle_de_trabajos_a_realizar` text COLLATE utf8mb4_unicode_ci,
  `recepcion` date NOT NULL,
  `prometido` date DEFAULT NULL,
  `cambio_de_aceite` tinyint(1) DEFAULT '0',
  `cambio_de_filtro` tinyint(1) DEFAULT '0',
  `detalles_de_entrada_del_vehiculo` text COLLATE utf8mb4_unicode_ci,
  `disponible` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ordens_cliente_id_foreign` (`cliente_id`),
  KEY `ordens_vehiculo_id_foreign` (`vehiculo_id`),
  CONSTRAINT `ordens_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ordens_vehiculo_id_foreign` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.ordens: ~2 rows (approximately)
INSERT INTO `ordens` (`id`, `cliente_id`, `vehiculo_id`, `detalle_de_trabajos_a_realizar`, `recepcion`, `prometido`, `cambio_de_aceite`, `cambio_de_filtro`, `detalles_de_entrada_del_vehiculo`, `disponible`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 'MANTENIMIENTO MENSUAL', '2026-01-20', '1900-01-01', 1, 1, 'FOCO DELANTERO DERECHO ROTO', 0, '2026-01-21 01:43:11', '2026-01-31 21:54:31'),
	(2, 1, 1, 'cambiar parabrisas', '2026-01-31', '1900-01-01', 1, 1, 'N/A', 1, '2026-01-31 21:56:59', '2026-01-31 21:56:59');

-- Dumping structure for table taller_mecanico.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.password_reset_tokens: ~0 rows (approximately)

-- Dumping structure for table taller_mecanico.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.personal_access_tokens: ~3 rows (approximately)
INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
	(11, 'App\\Models\\User', 1, 'auth_token', '9e12b95426f136fd1f435269e84dfd67121b0146c79736d71cbc9d78a185f8a7', '["*"]', '2026-01-31 21:45:05', NULL, '2026-01-31 21:45:01', '2026-01-31 21:45:05'),
	(12, 'App\\Models\\User', 1, 'auth_token', 'e5d07d91d15f9e0cd10af619032060c25d84aad50e61c3cad550f4b52fb12126', '["*"]', '2026-01-31 22:32:10', NULL, '2026-01-31 21:45:03', '2026-01-31 22:32:10'),
	(13, 'App\\Models\\User', 1, 'auth_token', '6904168ba81186159f5a5d6b04b7ae73139cb18d9f0c3055884b9bf6360129ab', '["*"]', '2026-01-31 22:05:12', NULL, '2026-01-31 22:04:45', '2026-01-31 22:05:12');

-- Dumping structure for table taller_mecanico.producto_usados
CREATE TABLE IF NOT EXISTS `producto_usados` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tarea_id` bigint unsigned NOT NULL,
  `producto_id` bigint unsigned NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_usados_tarea_id_foreign` (`tarea_id`),
  KEY `producto_usados_producto_id_foreign` (`producto_id`),
  CONSTRAINT `producto_usados_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `producto_usados_tarea_id_foreign` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.producto_usados: ~2 rows (approximately)
INSERT INTO `producto_usados` (`id`, `tarea_id`, `producto_id`, `cantidad`, `created_at`, `updated_at`) VALUES
	(1, 2, 1, 3, '2026-01-21 01:52:40', '2026-01-21 01:52:40'),
	(2, 1, 1, 2, '2026-01-31 21:51:29', '2026-01-31 21:51:29');

-- Dumping structure for table taller_mecanico.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `categoria_id` bigint unsigned NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `detalles` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `marca` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `precio` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `productos_categoria_id_foreign` (`categoria_id`),
  CONSTRAINT `productos_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.productos: ~1 rows (approximately)
INSERT INTO `productos` (`id`, `categoria_id`, `nombre`, `detalles`, `marca`, `stock`, `precio`, `created_at`, `updated_at`) VALUES
	(1, 1, 'SINTETICO', '4W40', 'ANCAP', 0, 3000.00, '2026-01-21 01:51:24', '2026-01-31 21:51:29');

-- Dumping structure for table taller_mecanico.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.sessions: ~0 rows (approximately)

-- Dumping structure for table taller_mecanico.tareas
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `orden_id` bigint unsigned NOT NULL,
  `mecanico_id` bigint unsigned NOT NULL,
  `estado_de_trabajo` enum('pendiente','en_proceso','pendiente_de_facturacion','completado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendiente',
  `notificacion_al_cliente` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tareas_orden_id_foreign` (`orden_id`),
  KEY `tareas_mecanico_id_foreign` (`mecanico_id`),
  CONSTRAINT `tareas_mecanico_id_foreign` FOREIGN KEY (`mecanico_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tareas_orden_id_foreign` FOREIGN KEY (`orden_id`) REFERENCES `ordens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.tareas: ~4 rows (approximately)
INSERT INTO `tareas` (`id`, `orden_id`, `mecanico_id`, `estado_de_trabajo`, `notificacion_al_cliente`, `created_at`, `updated_at`) VALUES
	(1, 1, 2, 'completado', 'CAMBIAR EL FILTRO DE AIRE', '2026-01-21 01:47:00', '2026-01-21 01:55:02'),
	(2, 1, 2, 'pendiente_de_facturacion', 'CAMBIAR DE ACEITE Y FILTRO', '2026-01-21 01:47:33', '2026-01-21 01:54:46'),
	(3, 2, 2, 'pendiente', 'cambiar parabrisas', '2026-01-31 21:57:30', '2026-01-31 21:57:30'),
	(4, 1, 2, 'en_proceso', 'prueba', '2026-01-31 21:57:53', '2026-01-31 21:57:53');

-- Dumping structure for table taller_mecanico.tren_delantero
CREATE TABLE IF NOT EXISTS `tren_delantero` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tarea_id` bigint unsigned NOT NULL,
  `conv` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `comba` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `avance` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `rotulas` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `punteros` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `bujes` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `caja_direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `conv2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `comba2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `avance2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `amort` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tren_delantero_tarea_id_foreign` (`tarea_id`),
  CONSTRAINT `tren_delantero_tarea_id_foreign` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.tren_delantero: ~4 rows (approximately)
INSERT INTO `tren_delantero` (`id`, `tarea_id`, `conv`, `comba`, `avance`, `rotulas`, `punteros`, `bujes`, `caja_direccion`, `conv2`, `comba2`, `avance2`, `amort`, `created_at`, `updated_at`) VALUES
	(1, 1, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2026-01-21 01:47:00', '2026-01-21 01:47:00'),
	(2, 2, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2026-01-21 01:47:33', '2026-01-21 01:47:33'),
	(3, 3, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2026-01-31 21:57:31', '2026-01-31 21:57:31'),
	(4, 4, '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2026-01-31 21:57:54', '2026-01-31 21:57:54');

-- Dumping structure for table taller_mecanico.tren_trasero
CREATE TABLE IF NOT EXISTS `tren_trasero` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tarea_id` bigint unsigned NOT NULL,
  `conv` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `comba` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `brazos_susp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `articulaciones` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `conv2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `comba2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `amort` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tren_trasero_tarea_id_foreign` (`tarea_id`),
  CONSTRAINT `tren_trasero_tarea_id_foreign` FOREIGN KEY (`tarea_id`) REFERENCES `tareas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.tren_trasero: ~4 rows (approximately)
INSERT INTO `tren_trasero` (`id`, `tarea_id`, `conv`, `comba`, `brazos_susp`, `articulaciones`, `conv2`, `comba2`, `amort`, `created_at`, `updated_at`) VALUES
	(1, 1, '0', '0', '0', '0', '0', '0', '0', '2026-01-21 01:47:00', '2026-01-21 01:47:00'),
	(2, 2, '0', '0', '0', '0', '0', '0', '0', '2026-01-21 01:47:33', '2026-01-21 01:47:33'),
	(3, 3, '0', '0', '0', '0', '0', '0', '0', '2026-01-31 21:57:31', '2026-01-31 21:57:31'),
	(4, 4, '0', '0', '0', '0', '0', '0', '0', '2026-01-31 21:57:54', '2026-01-31 21:57:54');

-- Dumping structure for table taller_mecanico.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `disponible` tinyint(1) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `rol` enum('jefe','mecanico') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'mecanico',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `disponible`, `remember_token`, `created_at`, `updated_at`, `rol`) VALUES
	(1, 'Jefe Taller', 'jefe@taller.com', NULL, '$2y$12$Wmck0jUM9Jp/hS2KftN.0OXa1yKuAtYJX/C3zDWX6VKSAvNRHf6vu', 1, NULL, '2026-01-10 04:48:50', '2026-01-10 05:09:34', 'jefe'),
	(2, 'Mecanico 1', 'mecanico1@taller.com', NULL, '$2y$12$EvT/J7My5jtDv8pHhlNjcuI7K83D1ph84PdSX5KCZy8r1RkCrZDBy', 1, NULL, '2026-01-21 01:38:48', '2026-01-21 01:38:48', 'mecanico');

-- Dumping structure for table taller_mecanico.vehiculos
CREATE TABLE IF NOT EXISTS `vehiculos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `modelo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marca` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `matricula` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kilometraje` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_de_serie` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_de_motor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_de_compra` date DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vehiculos_matricula_unique` (`matricula`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table taller_mecanico.vehiculos: ~1 rows (approximately)
INSERT INTO `vehiculos` (`id`, `modelo`, `marca`, `color`, `matricula`, `kilometraje`, `numero_de_serie`, `numero_de_motor`, `fecha_de_compra`, `disponible`, `created_at`, `updated_at`) VALUES
	(1, 'ALTO', 'SUSUKI', 'VERDE', 'SFC456', '40000', 'N/A', 'N/A', '1900-01-01', 1, '2026-01-21 01:41:35', '2026-01-21 01:41:35');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
