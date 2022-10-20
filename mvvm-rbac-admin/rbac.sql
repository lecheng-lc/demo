-- MySQL dump 10.13  Distrib 5.7.19, for macos10.12 (x86_64)
--
-- Host: localhost    Database: mvvm
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_user`
--

DROP TABLE IF EXISTS `admin_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `username` varchar(255) DEFAULT NULL COMMENT '管理员名',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号码',
  `status` int(1) DEFAULT '1' COMMENT '0: 无效,1:有效',
  `isAdmin` int(1) DEFAULT '1' COMMENT '0:超级管理员,1:普通管理员',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_user`
--

LOCK TABLES `admin_user` WRITE;
/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (2,'admin','123456','/public/admin/upload/20190602/1559472929530.jpg','18688647881',1,1,'2022-10-18 18:54:19','2022-10-18 18:54:19',2),(3,'bdmin','123456','/public/admin/upload/20190607/1559870348809.jpg','18688647881',1,1,'2022-10-18 09:19:08','2022-10-18 09:19:08',5),(4,'cdmin','123456','/public/admin/upload/20190607/1559870377377.jpg','18688647881',1,1,'2022-10-12 09:19:37','2022-10-12 09:19:37',6),(5,'ddmin','123456','/public/admin/upload/20190607/1559870395429.jpg','18688647883',1,1,'2022-10-09 09:19:55','2022-10-09 09:19:55',7),(6,'路飞同学','123456','/public/admin/upload/20190607/1559897765100.jpg','18688640000',1,1,'2022-10-18 16:56:05','2022-10-18 16:56:05',7),(7,'edmin','123456','/public/admin/upload/20190607/1559919431246.jpg','18688647003',1,1,'2022-10-21 22:57:11','2022-10-21 22:57:11',7);
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form`
--

DROP TABLE IF EXISTS `form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表单id',
  `check` varchar(255) DEFAULT 'false' COMMENT '是否选中',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COMMENT='表单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form`
--

LOCK TABLES `form` WRITE;
/*!40000 ALTER TABLE `form` DISABLE KEYS */;
INSERT INTO `form` VALUES (1,'1','2022-10-08 13:04:42','2022-10-08 13:04:42','a'),(2,'1','2022-10-08 13:05:42','2022-10-08 13:05:42','s'),(3,'0','2022-10-08 13:06:19','2022-10-08 13:06:19','d');
/*!40000 ALTER TABLE `form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '路由id',
  `type` int(1) DEFAULT '1' COMMENT '节点类型,1:表示模块 2:表示菜单3:操作',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `name` varchar(255) DEFAULT NULL COMMENT '路由名',
  `status` int(1) DEFAULT '1' COMMENT '0: 无效,1:有效',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  `permissionId` int(11) DEFAULT NULL COMMENT '自关联id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COMMENT='路由表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,1,'首页','home',1,'2022-10-04 14:55:02','2022-10-04 14:55:02',0),(3,1,'角色','role',1,'2022-10-04 15:11:36','2022-10-04 15:11:36',1),(5,2,'角色列表','roleList',1,'2022-10-04 15:12:10','2022-10-04 15:12:10',3),(6,3,'角色修改','roleUpdate',1,'2022-10-04 15:12:29','2022-10-04 15:12:29',3),(7,1,'管理员','adminUser',1,'2022-10-04 15:12:57','2022-10-04 15:12:57',1),(8,2,'管理员创建','adminUserCreate',1,'2022-10-04 15:13:05','2022-10-04 15:13:05',7),(9,2,'管理员列表','adminUserList',1,'2022-10-04 15:13:25','2022-10-04 15:13:25',7),(10,3,'管理员修改','adminUserUpdate',1,'2022-10-04 15:13:32','2022-10-04 15:13:32',7),(11,1,'权限','permission',1,'2022-10-04 15:13:40','2022-10-04 15:13:40',1),(12,2,'权限创建','permissionCreate',1,'2022-10-04 15:13:59','2022-10-04 15:13:59',11),(13,2,'权限列表','permissionList',1,'2022-10-04 15:14:10','2022-10-04 15:14:10',11),(14,3,'权限修改','permissionUpdate',1,'2022-10-04 15:14:17','2022-10-04 15:14:17',11),(15,3,'角色创建','roleCreate',1,'2022-10-05 22:29:28','2022-10-05 22:29:28',3),(16,3,'角色授权','roleAuth',1,'2022-10-05 22:59:46','2022-10-05 22:59:46',3),(18,3,'管理员删除','adminUserDelete',1,'2022-10-10 13:52:06','2022-10-10 13:52:06',7),(20,3,'路由权限删除','permissionDelete',1,'2022-10-10 14:03:55','2022-10-10 14:03:55',11);
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色id',
  `title` varchar(255) DEFAULT NULL COMMENT '角色标题',
  `description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `status` int(1) DEFAULT '1' COMMENT '0: 无效,1:有效',
  `createdAt` datetime DEFAULT NULL COMMENT '创建时间',
  `updatedAt` datetime DEFAULT NULL COMMENT '更改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (2,'我是超级管理员','超级管理员',1,'2022-10-02 18:49:47','2022-10-02 18:49:47'),(5,'校长','校长校长',1,'2022-10-07 09:13:07','2022-10-07 09:13:07'),(6,'老师','老师老师',1,'2022-10-07 09:13:17','2022-10-07 09:13:17'),(7,'学生','学生学生',1,'2022-10-07 09:13:29','2022-10-07 09:13:29');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色权限id',
  `roleId` int(11) DEFAULT NULL COMMENT '角色id',
  `permissionId` int(11) DEFAULT NULL COMMENT '权限id',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=762 DEFAULT CHARSET=utf8mb4 COMMENT='角色权限多对多';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (550,6,1,'2022-10-18 10:45:23','2022-10-18 10:45:23'),(551,6,7,'2022-10-18 10:45:23','2022-10-18 10:45:23'),(552,6,8,'2022-10-18 10:45:23','2022-10-18 10:45:23'),(553,6,9,'2022-10-18 10:45:23','2022-10-18 10:45:23'),(554,6,10,'2022-10-18 10:45:23','2022-10-18 10:45:23'),(563,7,11,'2022-10-20 13:50:10','2022-10-20 13:50:10'),(728,2,1,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(729,2,3,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(730,2,5,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(731,2,15,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(732,2,6,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(733,2,8,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(734,2,9,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(735,2,10,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(736,2,7,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(737,2,16,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(738,2,11,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(739,2,12,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(740,2,13,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(741,2,18,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(742,2,14,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(743,2,20,'2022-10-20 17:47:46','2022-10-20 17:47:46'),(744,5,1,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(745,5,3,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(746,5,5,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(747,5,6,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(748,5,9,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(749,5,15,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(750,5,16,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(751,5,7,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(752,5,8,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(753,5,10,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(754,5,18,'2022-10-20 17:49:23','2022-10-20 17:49:23'),(761,3,7,'2022-10-20 22:31:24','2022-10-20 22:31:24');
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mvvm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-20 22:55:50
