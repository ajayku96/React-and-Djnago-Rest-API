BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL,
	"action_time"	datetime NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	integer NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag" >= 0),
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL,
	"name"	varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "authtoken_token" (
	"key"	varchar(40) NOT NULL,
	"created"	datetime NOT NULL,
	"user_id"	integer NOT NULL UNIQUE,
	PRIMARY KEY("key"),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
CREATE TABLE IF NOT EXISTS "API_foodcategory" (
	"id"	integer NOT NULL,
	"category"	varchar(20) NOT NULL,
	"description"	varchar(200),
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "API_foods" (
	"id"	integer NOT NULL,
	"name"	varchar(60) NOT NULL,
	"food_img"	varchar(100) NOT NULL,
	"price"	real NOT NULL,
	"res_name_id"	integer NOT NULL,
	"description"	text,
	"food_cat_id"	integer NOT NULL,
	"food_rating"	real NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("res_name_id") REFERENCES "API_restaurant"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("food_cat_id") REFERENCES "API_foodcategory"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "API_restaurant" (
	"id"	integer NOT NULL,
	"name"	varchar(60) NOT NULL,
	"res_img"	varchar(100) NOT NULL,
	"location"	varchar(15) NOT NULL,
	"res_avg_rating"	real NOT NULL,
	"description"	text,
	"user_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "accounts_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "order_order" (
	"id"	integer NOT NULL,
	"full_name"	varchar(120) NOT NULL,
	"email"	varchar(254) NOT NULL,
	"phone"	varchar(15) NOT NULL,
	"address"	varchar(250) NOT NULL,
	"created"	datetime NOT NULL,
	"updated"	datetime NOT NULL,
	"paid"	bool NOT NULL,
	"invoice_no"	varchar(70),
	"created_by"	varchar(100) NOT NULL,
	"order_delivered"	bool NOT NULL,
	"order_picked"	bool NOT NULL,
	"rest_approval"	bool NOT NULL,
	"pick_up_by"	varchar(50) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "order_orderitem" (
	"id"	integer NOT NULL,
	"price"	decimal NOT NULL,
	"quantity"	integer unsigned NOT NULL CHECK("quantity" >= 0),
	"product_id"	integer NOT NULL,
	"order_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("order_id") REFERENCES "order_order"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("product_id") REFERENCES "API_foods"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "accounts_user" (
	"id"	integer NOT NULL,
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"username"	varchar(50) NOT NULL UNIQUE,
	"email"	varchar(255) NOT NULL UNIQUE,
	"is_active"	bool NOT NULL,
	"is_admin"	bool NOT NULL,
	"address"	varchar(500) NOT NULL,
	"type"	varchar(3) NOT NULL,
	"image"	varchar(100) NOT NULL,
	"mobile"	varchar(15) NOT NULL,
	"full_name"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "django_migrations" VALUES (1,'accounts','0001_initial','2021-03-26 08:33:49.323053');
INSERT INTO "django_migrations" VALUES (2,'API','0001_initial','2021-03-26 08:33:49.357007');
INSERT INTO "django_migrations" VALUES (3,'contenttypes','0001_initial','2021-03-26 08:33:49.370926');
INSERT INTO "django_migrations" VALUES (4,'admin','0001_initial','2021-03-26 08:33:49.387916');
INSERT INTO "django_migrations" VALUES (5,'admin','0002_logentry_remove_auto_add','2021-03-26 08:33:49.417849');
INSERT INTO "django_migrations" VALUES (6,'admin','0003_logentry_add_action_flag_choices','2021-03-26 08:33:49.445756');
INSERT INTO "django_migrations" VALUES (7,'contenttypes','0002_remove_content_type_name','2021-03-26 08:33:49.511757');
INSERT INTO "django_migrations" VALUES (8,'auth','0001_initial','2021-03-26 08:33:49.552647');
INSERT INTO "django_migrations" VALUES (9,'auth','0002_alter_permission_name_max_length','2021-03-26 08:33:49.579575');
INSERT INTO "django_migrations" VALUES (10,'auth','0003_alter_user_email_max_length','2021-03-26 08:33:49.596532');
INSERT INTO "django_migrations" VALUES (11,'auth','0004_alter_user_username_opts','2021-03-26 08:33:49.608641');
INSERT INTO "django_migrations" VALUES (12,'auth','0005_alter_user_last_login_null','2021-03-26 08:33:49.623602');
INSERT INTO "django_migrations" VALUES (13,'auth','0006_require_contenttypes_0002','2021-03-26 08:33:49.630598');
INSERT INTO "django_migrations" VALUES (14,'auth','0007_alter_validators_add_error_messages','2021-03-26 08:33:49.655522');
INSERT INTO "django_migrations" VALUES (15,'auth','0008_alter_user_username_max_length','2021-03-26 08:33:49.678454');
INSERT INTO "django_migrations" VALUES (16,'auth','0009_alter_user_last_name_max_length','2021-03-26 08:33:49.694835');
INSERT INTO "django_migrations" VALUES (17,'auth','0010_alter_group_name_max_length','2021-03-26 08:33:49.717546');
INSERT INTO "django_migrations" VALUES (18,'auth','0011_update_proxy_permissions','2021-03-26 08:33:49.756443');
INSERT INTO "django_migrations" VALUES (19,'auth','0012_alter_user_first_name_max_length','2021-03-26 08:33:49.771402');
INSERT INTO "django_migrations" VALUES (20,'authtoken','0001_initial','2021-03-26 08:33:49.815341');
INSERT INTO "django_migrations" VALUES (21,'authtoken','0002_auto_20160226_1747','2021-03-26 08:33:49.899115');
INSERT INTO "django_migrations" VALUES (22,'authtoken','0003_tokenproxy','2021-03-26 08:33:49.909089');
INSERT INTO "django_migrations" VALUES (23,'order','0001_initial','2021-03-26 08:33:49.959073');
INSERT INTO "django_migrations" VALUES (24,'sessions','0001_initial','2021-03-26 08:33:49.978912');
INSERT INTO "django_migrations" VALUES (25,'accounts','0002_auto_20210516_0037','2021-05-15 19:08:05.622667');
INSERT INTO "django_migrations" VALUES (26,'accounts','0003_auto_20210516_0037','2021-05-15 19:08:05.685156');
INSERT INTO "django_migrations" VALUES (27,'API','0002_auto_20210516_0044','2021-05-15 19:14:38.345744');
INSERT INTO "django_migrations" VALUES (28,'accounts','0004_auto_20210516_0044','2021-05-15 19:14:38.383530');
INSERT INTO "django_migrations" VALUES (29,'accounts','0005_auto_20210516_1307','2021-05-16 07:37:27.278609');
INSERT INTO "django_migrations" VALUES (30,'accounts','0006_auto_20210519_2356','2021-05-19 18:26:57.432656');
INSERT INTO "django_migrations" VALUES (31,'accounts','0007_auto_20210519_2358','2021-05-19 18:28:37.377790');
INSERT INTO "django_migrations" VALUES (32,'accounts','0008_auto_20210520_0001','2021-05-19 18:31:52.384252');
INSERT INTO "django_migrations" VALUES (33,'API','0003_auto_20210521_1158','2021-05-21 06:29:01.302014');
INSERT INTO "django_migrations" VALUES (34,'accounts','0009_auto_20210521_1150','2021-05-21 06:29:01.359857');
INSERT INTO "django_migrations" VALUES (35,'API','0004_foods_food_cat','2021-05-21 07:05:51.932735');
INSERT INTO "django_migrations" VALUES (36,'order','0002_order_user','2021-05-21 07:42:34.496499');
INSERT INTO "django_migrations" VALUES (37,'order','0003_remove_orderitem_restaurant_name','2021-05-21 07:51:52.459364');
INSERT INTO "django_migrations" VALUES (38,'API','0005_foods_food_rating','2021-05-21 09:51:40.744343');
INSERT INTO "django_migrations" VALUES (39,'accounts','0010_user_mobile','2021-05-21 17:43:30.787632');
INSERT INTO "django_migrations" VALUES (40,'accounts','0011_user_full_name','2021-05-24 10:03:39.517121');
INSERT INTO "django_migrations" VALUES (41,'order','0004_auto_20210524_2251','2021-05-24 17:21:25.004622');
INSERT INTO "django_migrations" VALUES (42,'order','0005_order_order_status','2021-06-01 12:45:32.943398');
INSERT INTO "django_migrations" VALUES (43,'order','0006_auto_20210601_1848','2021-06-01 13:19:01.760166');
INSERT INTO "django_migrations" VALUES (44,'order','0005_auto_20210601_1849','2021-06-01 13:19:50.974820');
INSERT INTO "django_migrations" VALUES (45,'order','0005_auto_20210601_1850','2021-06-01 13:20:32.044811');
INSERT INTO "django_migrations" VALUES (46,'order','0006_order_user','2021-06-01 19:34:19.225080');
INSERT INTO "django_migrations" VALUES (47,'order','0007_remove_order_user','2021-06-01 19:49:47.242994');
INSERT INTO "django_migrations" VALUES (48,'API','0006_restaurant_user','2021-06-02 18:26:55.629347');
INSERT INTO "django_migrations" VALUES (49,'order','0008_order_res_name','2021-06-04 18:02:40.911723');
INSERT INTO "django_migrations" VALUES (50,'order','0009_remove_order_res_name','2021-06-05 20:48:29.600791');
INSERT INTO "django_migrations" VALUES (51,'order','0010_order_rest_approval','2021-06-09 10:56:35.843815');
INSERT INTO "django_migrations" VALUES (52,'order','0011_order_pick_up_by','2021-06-10 08:08:03.780565');
INSERT INTO "django_migrations" VALUES (53,'accounts','0012_auto_20210611_0145','2021-06-10 20:15:26.439735');
INSERT INTO "django_migrations" VALUES (54,'order','0012_auto_20210611_0144','2021-06-10 20:15:26.464208');
INSERT INTO "django_migrations" VALUES (55,'accounts','0013_remove_user_location','2021-06-10 20:19:56.002920');
INSERT INTO "django_admin_log" VALUES (1,'2021-03-26 08:34:58.519922','1','GoldFish','[{"added": {}}]',7,1,1);
INSERT INTO "django_admin_log" VALUES (2,'2021-03-26 08:35:19.464230','1','Foods object (1)','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (3,'2021-03-26 08:35:33.069370','2','Foods object (2)','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (4,'2021-03-26 08:37:30.745049','1','Order 1','[{"added": {}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES (5,'2021-04-02 20:05:21.516872','2','Order 2','[{"added": {"name": "order item", "object": "2"}}, {"added": {"name": "order item", "object": "3"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (6,'2021-05-15 11:30:13.765229','4','Order 4','[{"added": {"name": "order item", "object": "4"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (7,'2021-05-15 11:30:32.814345','4','Order 4','[{"changed": {"name": "order item", "object": "4", "fields": ["Restaurant name"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (8,'2021-05-15 11:36:39.768912','4','Order 4','[{"changed": {"name": "order item", "object": "4", "fields": ["Restaurant name"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (9,'2021-05-15 19:08:56.314773','1','admin','[{"changed": {"fields": ["Address"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (10,'2021-05-15 19:14:57.743910','1','admin','[{"changed": {"fields": ["Type"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (11,'2021-05-15 19:16:15.431008','1','admin','[{"changed": {"fields": ["Image"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (12,'2021-05-15 20:59:20.472314','2','big','[{"added": {}}]',12,1,1);
INSERT INTO "django_admin_log" VALUES (13,'2021-05-16 08:43:58.425098','2','big','',12,1,3);
INSERT INTO "django_admin_log" VALUES (14,'2021-05-16 10:15:38.718776','4','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (15,'2021-05-16 10:45:57.407637','6','l','',12,1,3);
INSERT INTO "django_admin_log" VALUES (16,'2021-05-19 18:17:25.268097','8','nn','',12,1,3);
INSERT INTO "django_admin_log" VALUES (17,'2021-05-19 18:18:25.002312','9','nn','',12,1,3);
INSERT INTO "django_admin_log" VALUES (18,'2021-05-19 18:19:15.508206','10','nn','',12,1,3);
INSERT INTO "django_admin_log" VALUES (19,'2021-05-19 18:20:05.209580','11','nn','',12,1,3);
INSERT INTO "django_admin_log" VALUES (20,'2021-05-19 18:21:53.049646','12','nn','',12,1,3);
INSERT INTO "django_admin_log" VALUES (21,'2021-05-19 18:22:18.905392','5','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (22,'2021-05-19 18:23:00.941030','13','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (23,'2021-05-19 18:23:23.271927','14','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (24,'2021-05-19 18:24:56.618811','15','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (25,'2021-05-19 18:25:55.614161','16','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (26,'2021-05-19 18:28:57.880850','8','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (27,'2021-05-20 10:28:10.033709','9','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (28,'2021-05-20 10:30:34.010189','10','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (29,'2021-05-20 10:38:27.308191','11','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (30,'2021-05-20 10:50:26.010548','12','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (31,'2021-05-20 10:51:26.647877','13','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (32,'2021-05-20 10:56:07.750000','14','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (33,'2021-05-20 11:00:11.169537','15','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (34,'2021-05-20 11:00:45.280034','16','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (35,'2021-05-20 11:01:52.625359','17','bb','',12,1,3);
INSERT INTO "django_admin_log" VALUES (36,'2021-05-20 11:03:22.244768','18','bb','',12,1,3);
INSERT INTO "django_admin_log" VALUES (37,'2021-05-20 11:50:51.520403','19','nn','',12,1,3);
INSERT INTO "django_admin_log" VALUES (38,'2021-05-20 11:51:18.707554','20','nn','',12,1,3);
INSERT INTO "django_admin_log" VALUES (39,'2021-05-21 07:03:58.970290','1','this','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (40,'2021-05-21 07:05:18.720168','2','this','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (41,'2021-05-21 07:06:05.222966','2','this','',15,1,3);
INSERT INTO "django_admin_log" VALUES (42,'2021-05-21 07:06:05.246901','1','this','',15,1,3);
INSERT INTO "django_admin_log" VALUES (43,'2021-05-21 07:06:10.666232','3','this','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (44,'2021-05-21 07:06:22.045267','3','this','',15,1,3);
INSERT INTO "django_admin_log" VALUES (45,'2021-05-21 07:06:26.517052','4','ajk','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (46,'2021-05-21 07:06:32.361136','5','adkf','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (47,'2021-05-21 07:06:44.933286','5','adkf','',15,1,3);
INSERT INTO "django_admin_log" VALUES (48,'2021-05-21 07:06:44.953248','4','ajk','',15,1,3);
INSERT INTO "django_admin_log" VALUES (49,'2021-05-21 08:31:06.648060','6','delicious pizza','',8,1,3);
INSERT INTO "django_admin_log" VALUES (50,'2021-05-21 08:31:13.605357','7','Pizza','[{"changed": {"fields": ["Name"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (51,'2021-05-21 10:14:38.325977','9','Coffee','[{"changed": {"fields": ["Food rating"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (52,'2021-05-21 10:14:50.512025','8','Fish Fry','[{"changed": {"fields": ["Food rating"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (53,'2021-05-21 12:49:04.566852','8','new','[{"changed": {"fields": ["Image"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (54,'2021-05-24 10:15:59.373128','8','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (55,'2021-05-24 10:24:13.422720','10','win','',12,1,3);
INSERT INTO "django_admin_log" VALUES (56,'2021-05-24 10:24:19.499562','9','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (57,'2021-05-24 10:24:42.135927','11','new','',12,1,3);
INSERT INTO "django_admin_log" VALUES (58,'2021-05-24 10:36:01.809003','12','new','[{"changed": {"fields": ["Image"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (59,'2021-05-24 11:19:04.715131','9','Coffee Coffee Coffee Coffee','[{"changed": {"fields": ["Name"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (60,'2021-05-24 14:29:38.717041','5','Order 5','[{"added": {}}, {"added": {"name": "order item", "object": "1"}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES (61,'2021-05-24 14:44:07.500068','3','Order 3','[{"changed": {"fields": ["Email"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (62,'2021-05-24 17:22:56.775553','6','Order 6','',10,1,3);
INSERT INTO "django_admin_log" VALUES (63,'2021-05-24 17:23:15.225087','7','Order 7','',10,1,3);
INSERT INTO "django_admin_log" VALUES (64,'2021-05-24 18:10:26.088823','5','Order 5','[{"added": {"name": "order item", "object": "2"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (65,'2021-05-25 07:22:57.582566','9','Coffee','[{"changed": {"fields": ["Name"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (66,'2021-05-29 10:23:57.907179','9','Non-Veg','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (67,'2021-05-29 10:24:26.031509','10','Goat Meat','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (68,'2021-05-29 14:16:18.540905','9','Coffee Coffee Coffee Coffee','[{"changed": {"fields": ["Name"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (69,'2021-05-31 15:05:03.165501','10','veg','[{"added": {}}]',15,1,1);
INSERT INTO "django_admin_log" VALUES (70,'2021-05-31 15:05:23.919536','11','Salad','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (71,'2021-05-31 16:31:11.532482','8','Order 8','',10,1,3);
INSERT INTO "django_admin_log" VALUES (72,'2021-06-01 07:21:56.848768','13','Order 13','',10,1,3);
INSERT INTO "django_admin_log" VALUES (73,'2021-06-01 07:21:56.859330','12','Order 12','',10,1,3);
INSERT INTO "django_admin_log" VALUES (74,'2021-06-01 07:21:56.865516','11','Order 11','',10,1,3);
INSERT INTO "django_admin_log" VALUES (75,'2021-06-01 07:21:56.871532','10','Order 10','',10,1,3);
INSERT INTO "django_admin_log" VALUES (76,'2021-06-01 07:21:56.878718','9','Order 9','',10,1,3);
INSERT INTO "django_admin_log" VALUES (77,'2021-06-01 07:21:56.884164','5','Order 5','',10,1,3);
INSERT INTO "django_admin_log" VALUES (78,'2021-06-01 20:52:15.098286','12','new','[{"changed": {"fields": ["Address"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (79,'2021-06-02 18:56:25.128332','12','new','[]',12,1,2);
INSERT INTO "django_admin_log" VALUES (80,'2021-06-03 09:24:50.743145','5','Brother Dhaba','[{"changed": {"fields": ["User", "Description"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (81,'2021-06-03 12:43:49.929126','12','this','',8,1,3);
INSERT INTO "django_admin_log" VALUES (82,'2021-06-03 23:02:09.968644','13','this','',8,1,3);
INSERT INTO "django_admin_log" VALUES (83,'2021-06-04 06:31:09.028769','15','h','',8,1,3);
INSERT INTO "django_admin_log" VALUES (84,'2021-06-04 06:31:44.274666','17','nknkj','',8,1,3);
INSERT INTO "django_admin_log" VALUES (85,'2021-06-04 06:31:47.828732','16','nk','',8,1,3);
INSERT INTO "django_admin_log" VALUES (86,'2021-06-04 07:10:14.491939','14','this','',8,1,3);
INSERT INTO "django_admin_log" VALUES (87,'2021-06-04 17:32:45.254162','18','yebsb','',8,1,3);
INSERT INTO "django_admin_log" VALUES (88,'2021-06-04 18:08:55.094885','73','FootApp#440063','',10,1,3);
INSERT INTO "django_admin_log" VALUES (89,'2021-06-04 18:08:55.113456','72','FootApp#440062','',10,1,3);
INSERT INTO "django_admin_log" VALUES (90,'2021-06-04 18:08:55.130376','71','FootApp#440061','',10,1,3);
INSERT INTO "django_admin_log" VALUES (91,'2021-06-04 18:08:55.148328','70','FootApp#440060','',10,1,3);
INSERT INTO "django_admin_log" VALUES (92,'2021-06-04 18:08:55.164284','69','FootApp#440059','',10,1,3);
INSERT INTO "django_admin_log" VALUES (93,'2021-06-04 18:08:55.182303','68','FootApp#440058','',10,1,3);
INSERT INTO "django_admin_log" VALUES (94,'2021-06-04 18:08:55.198261','67','FootApp#440057','',10,1,3);
INSERT INTO "django_admin_log" VALUES (95,'2021-06-04 18:08:55.216264','66','FootApp#440056','',10,1,3);
INSERT INTO "django_admin_log" VALUES (96,'2021-06-04 18:08:55.233168','65','FootApp#440055','',10,1,3);
INSERT INTO "django_admin_log" VALUES (97,'2021-06-04 18:08:55.251120','64','FootApp#440054','',10,1,3);
INSERT INTO "django_admin_log" VALUES (98,'2021-06-04 18:08:55.267077','63','FootApp#440053','',10,1,3);
INSERT INTO "django_admin_log" VALUES (99,'2021-06-04 18:08:55.285029','62','FootApp#440052','',10,1,3);
INSERT INTO "django_admin_log" VALUES (100,'2021-06-04 18:08:55.301983','61','FootApp#440051','',10,1,3);
INSERT INTO "django_admin_log" VALUES (101,'2021-06-04 18:08:55.325919','60','FootApp#440050','',10,1,3);
INSERT INTO "django_admin_log" VALUES (102,'2021-06-04 18:08:55.344921','59','FootApp#440049','',10,1,3);
INSERT INTO "django_admin_log" VALUES (103,'2021-06-04 18:08:55.361823','58','FootApp#440048','',10,1,3);
INSERT INTO "django_admin_log" VALUES (104,'2021-06-04 18:08:55.380795','57','FootApp#440047','',10,1,3);
INSERT INTO "django_admin_log" VALUES (105,'2021-06-04 18:08:55.397728','56','FootApp#440046','',10,1,3);
INSERT INTO "django_admin_log" VALUES (106,'2021-06-04 18:08:55.413684','55','FootApp#440045','',10,1,3);
INSERT INTO "django_admin_log" VALUES (107,'2021-06-04 18:08:55.431688','54','FootApp#440044','',10,1,3);
INSERT INTO "django_admin_log" VALUES (108,'2021-06-04 18:08:55.449591','53','FootApp#440043','',10,1,3);
INSERT INTO "django_admin_log" VALUES (109,'2021-06-04 18:08:55.466598','52','FootApp#440042','',10,1,3);
INSERT INTO "django_admin_log" VALUES (110,'2021-06-04 18:08:55.483498','51','FootApp#440041','',10,1,3);
INSERT INTO "django_admin_log" VALUES (111,'2021-06-04 18:08:55.500454','50','FootApp#440040','',10,1,3);
INSERT INTO "django_admin_log" VALUES (112,'2021-06-04 18:08:55.517458','49','FootApp#440039','',10,1,3);
INSERT INTO "django_admin_log" VALUES (113,'2021-06-04 18:08:55.534413','48','FootApp#440038','',10,1,3);
INSERT INTO "django_admin_log" VALUES (114,'2021-06-04 18:08:55.551317','47','FootApp#440037','',10,1,3);
INSERT INTO "django_admin_log" VALUES (115,'2021-06-04 18:08:55.568323','46','FootApp#440036','',10,1,3);
INSERT INTO "django_admin_log" VALUES (116,'2021-06-04 18:08:55.590215','45','FootApp#440035','',10,1,3);
INSERT INTO "django_admin_log" VALUES (117,'2021-06-04 18:08:55.607168','44','FootApp#440034','',10,1,3);
INSERT INTO "django_admin_log" VALUES (118,'2021-06-04 18:08:55.624121','43','FootApp#440033','',10,1,3);
INSERT INTO "django_admin_log" VALUES (119,'2021-06-04 18:08:55.641078','42','FootApp#440032','',10,1,3);
INSERT INTO "django_admin_log" VALUES (120,'2021-06-04 18:08:55.658032','41','FootApp#440031','',10,1,3);
INSERT INTO "django_admin_log" VALUES (121,'2021-06-04 18:08:55.673988','40','FootApp#440030','',10,1,3);
INSERT INTO "django_admin_log" VALUES (122,'2021-06-04 18:08:55.691942','39','FootApp#440029','',10,1,3);
INSERT INTO "django_admin_log" VALUES (123,'2021-06-04 18:08:55.709893','38','FootApp#440028','',10,1,3);
INSERT INTO "django_admin_log" VALUES (124,'2021-06-04 18:08:55.725905','37','FootApp#440027','',10,1,3);
INSERT INTO "django_admin_log" VALUES (125,'2021-06-04 18:08:55.742806','36','FootApp#440026','',10,1,3);
INSERT INTO "django_admin_log" VALUES (126,'2021-06-04 18:08:55.760757','35','FootApp#440025','',10,1,3);
INSERT INTO "django_admin_log" VALUES (127,'2021-06-04 18:08:55.778709','34','FootApp#440024','',10,1,3);
INSERT INTO "django_admin_log" VALUES (128,'2021-06-04 18:08:55.797659','33','FootApp#440023','',10,1,3);
INSERT INTO "django_admin_log" VALUES (129,'2021-06-04 18:08:55.817607','32','FootApp#440022','',10,1,3);
INSERT INTO "django_admin_log" VALUES (130,'2021-06-04 18:08:55.836554','31','FootApp#440021','',10,1,3);
INSERT INTO "django_admin_log" VALUES (131,'2021-06-04 18:08:55.862523','30','FootApp#440020','',10,1,3);
INSERT INTO "django_admin_log" VALUES (132,'2021-06-04 18:08:55.880438','29','FootApp#440019','',10,1,3);
INSERT INTO "django_admin_log" VALUES (133,'2021-06-04 18:08:55.900385','28','FootApp#440018','',10,1,3);
INSERT INTO "django_admin_log" VALUES (134,'2021-06-04 18:08:55.918337','27','FootApp#440017','',10,1,3);
INSERT INTO "django_admin_log" VALUES (135,'2021-06-04 18:08:55.935290','26','FootApp#440016','',10,1,3);
INSERT INTO "django_admin_log" VALUES (136,'2021-06-04 18:08:55.954239','25','FootApp#440015','',10,1,3);
INSERT INTO "django_admin_log" VALUES (137,'2021-06-04 18:08:55.975186','24','FootApp#440014','',10,1,3);
INSERT INTO "django_admin_log" VALUES (138,'2021-06-04 18:08:55.981168','23','FootApp#440013','',10,1,3);
INSERT INTO "django_admin_log" VALUES (139,'2021-06-04 18:08:55.999120','22','FootApp#440012','',10,1,3);
INSERT INTO "django_admin_log" VALUES (140,'2021-06-04 18:08:56.015077','21','FootApp#440011','',10,1,3);
INSERT INTO "django_admin_log" VALUES (141,'2021-06-04 18:08:56.033388','20','FootApp#440010','',10,1,3);
INSERT INTO "django_admin_log" VALUES (142,'2021-06-04 18:08:56.050344','19','FootApp#440009','',10,1,3);
INSERT INTO "django_admin_log" VALUES (143,'2021-06-04 18:08:56.069098','18','FootApp#440008','',10,1,3);
INSERT INTO "django_admin_log" VALUES (144,'2021-06-04 18:08:56.094032','17','FootApp#440007','',10,1,3);
INSERT INTO "django_admin_log" VALUES (145,'2021-06-04 18:08:56.112982','16','FootApp#440006','',10,1,3);
INSERT INTO "django_admin_log" VALUES (146,'2021-06-04 18:08:56.140907','15','FootApp#440005','',10,1,3);
INSERT INTO "django_admin_log" VALUES (147,'2021-06-04 18:08:56.157860','14','FootApp#440004','',10,1,3);
INSERT INTO "django_admin_log" VALUES (148,'2021-06-04 18:08:56.180799','4','FootApp#440003','',10,1,3);
INSERT INTO "django_admin_log" VALUES (149,'2021-06-04 18:08:56.186784','3','FootApp#440002','',10,1,3);
INSERT INTO "django_admin_log" VALUES (150,'2021-06-04 18:08:56.191771','2','FootApp#440001','',10,1,3);
INSERT INTO "django_admin_log" VALUES (151,'2021-06-04 18:08:56.196757','1','FootApp#4400','',10,1,3);
INSERT INTO "django_admin_log" VALUES (152,'2021-06-08 17:57:05.429741','4','Pizzeria','[{"changed": {"fields": ["User", "Description"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (153,'2021-06-08 17:57:59.729618','4','Pizzeria','[{"changed": {"fields": ["User"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (154,'2021-06-08 19:06:29.966051','4','FootApp#440003','[{"changed": {"fields": ["Created by"]}}, {"changed": {"name": "order item", "object": "80", "fields": ["Product"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (155,'2021-06-08 19:08:19.414991','5','FootApp#440004','[{"changed": {"fields": ["Created by"]}}, {"added": {"name": "order item", "object": "84"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (156,'2021-06-08 19:14:07.506402','4','FootApp#440003','[{"deleted": {"name": "order item", "object": "None"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (157,'2021-06-08 19:17:25.359665','3','FootApp#440002','[{"changed": {"fields": ["Created by"]}}, {"added": {"name": "order item", "object": "85"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (158,'2021-06-08 19:19:29.024463','6','FootApp#440005','[{"added": {}}, {"added": {"name": "order item", "object": "86"}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES (159,'2021-06-08 19:19:41.401651','19','billi','[{"changed": {"fields": ["Res name"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (160,'2021-06-08 20:01:08.683993','3','FootApp#440002','[{"changed": {"name": "order item", "object": "85", "fields": ["Product"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (161,'2021-06-08 20:03:10.920499','6','FootApp#440005','[{"added": {"name": "order item", "object": "87"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (162,'2021-06-08 20:04:02.719886','2','FootApp#440001','[{"changed": {"fields": ["Created by"]}}, {"added": {"name": "order item", "object": "88"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (163,'2021-06-08 20:05:12.308305','2','FootApp#440001','[{"deleted": {"name": "order item", "object": "None"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (164,'2021-06-08 20:05:24.668551','6','FootApp#440005','[{"deleted": {"name": "order item", "object": "None"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (165,'2021-06-09 11:30:25.484732','6','FootApp#440005','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (166,'2021-06-09 12:24:33.749306','3','FootApp#440002','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (167,'2021-06-09 12:26:19.636225','3','FootApp#440002','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (168,'2021-06-09 12:26:58.725400','3','FootApp#440002','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (169,'2021-06-09 12:27:08.472958','3','FootApp#440002','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (170,'2021-06-09 12:37:31.299307','5','FootApp#440004','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (171,'2021-06-09 12:48:06.335914','6','FootApp#440005','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (172,'2021-06-09 12:48:13.971815','5','FootApp#440004','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (173,'2021-06-09 12:48:23.069029','4','FootApp#440003','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (174,'2021-06-09 12:48:42.181314','6','FootApp#440005','[{"changed": {"fields": ["Rest approval"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (175,'2021-06-09 15:43:06.423201','5','FootApp#440004','[{"changed": {"fields": ["Rest approval", "Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (176,'2021-06-09 17:05:26.053093','20','Windows','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (177,'2021-06-09 17:54:03.574916','4','FootApp#440003','[{"added": {"name": "order item", "object": "91"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (178,'2021-06-09 17:54:26.443339','7','FootApp#440006','[{"changed": {"fields": ["Created by"]}}, {"added": {"name": "order item", "object": "92"}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (179,'2021-06-09 18:43:14.357382','22','sald','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (180,'2021-06-09 18:43:24.348676','22','Salad','[{"changed": {"fields": ["Name"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (181,'2021-06-09 18:44:10.675603','23','Noodles','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (182,'2021-06-09 18:45:22.319691','24','Noodles','[{"added": {}}]',8,1,1);
INSERT INTO "django_admin_log" VALUES (183,'2021-06-09 19:01:18.793326','8','FootApp#440007','[{"added": {}}, {"added": {"name": "order item", "object": "93"}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES (184,'2021-06-09 19:02:00.553209','9','FootApp#440008','[{"added": {}}, {"added": {"name": "order item", "object": "94"}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES (185,'2021-06-09 19:03:07.686612','10','FootApp#440009','[{"added": {}}, {"added": {"name": "order item", "object": "95"}}]',10,1,1);
INSERT INTO "django_admin_log" VALUES (186,'2021-06-09 19:14:40.371690','2','Cafe Coffee day','[{"changed": {"fields": ["User", "Description"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (187,'2021-06-09 19:14:47.675683','5','Brother Dhaba','[{"changed": {"fields": ["User"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (188,'2021-06-09 19:15:01.670596','5','Brother Dhaba','[{"changed": {"fields": ["User"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (189,'2021-06-09 19:15:09.474695','5','Brother Dhaba','[]',7,1,2);
INSERT INTO "django_admin_log" VALUES (190,'2021-06-09 19:15:15.528853','2','Cafe Coffee day','[{"changed": {"fields": ["User"]}}]',7,1,2);
INSERT INTO "django_admin_log" VALUES (191,'2021-06-09 19:15:51.799355','25','gd','[{"changed": {"fields": ["Res name"]}}]',8,1,2);
INSERT INTO "django_admin_log" VALUES (192,'2021-06-10 09:26:16.359069','10','FootApp#440009','[{"changed": {"fields": ["Rest approval", "Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (193,'2021-06-10 09:26:27.624243','7','FootApp#440006','[{"changed": {"fields": ["Rest approval", "Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (194,'2021-06-10 09:26:41.716408','8','FootApp#440007','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (195,'2021-06-10 10:01:08.193293','10','FootApp#440009','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (196,'2021-06-10 10:05:58.057384','8','FootApp#440007','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (197,'2021-06-10 10:20:43.577499','10','FootApp#440009','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (198,'2021-06-10 10:20:53.620060','8','FootApp#440007','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (199,'2021-06-10 10:24:43.106265','10','FootApp#440009','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (200,'2021-06-10 10:24:48.245849','7','FootApp#440006','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (201,'2021-06-10 10:25:02.140002','8','FootApp#440007','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (202,'2021-06-10 10:25:14.688631','10','FootApp#440009','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (203,'2021-06-10 10:25:22.405507','8','FootApp#440007','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (204,'2021-06-10 10:36:48.960121','10','FootApp#440009','[{"changed": {"fields": ["Order picked"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (205,'2021-06-10 18:19:46.665442','3','big','[{"changed": {"fields": ["Type"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (206,'2021-06-10 18:21:47.634575','3','big','',12,1,3);
INSERT INTO "django_admin_log" VALUES (207,'2021-06-10 18:42:53.377696','13','basic','[{"changed": {"fields": ["Type"]}}]',12,1,2);
INSERT INTO "django_admin_log" VALUES (208,'2021-06-10 18:43:07.895117','6','FootApp#440005','[{"changed": {"fields": ["Created by"]}}]',10,1,2);
INSERT INTO "django_admin_log" VALUES (209,'2021-06-10 20:21:04.670481','12','new','[{"changed": {"fields": ["Address"]}}]',12,1,2);
INSERT INTO "django_content_type" VALUES (1,'admin','logentry');
INSERT INTO "django_content_type" VALUES (2,'auth','permission');
INSERT INTO "django_content_type" VALUES (3,'auth','group');
INSERT INTO "django_content_type" VALUES (4,'contenttypes','contenttype');
INSERT INTO "django_content_type" VALUES (5,'sessions','session');
INSERT INTO "django_content_type" VALUES (6,'API','employee');
INSERT INTO "django_content_type" VALUES (7,'API','restaurant');
INSERT INTO "django_content_type" VALUES (8,'API','foods');
INSERT INTO "django_content_type" VALUES (9,'API','customer');
INSERT INTO "django_content_type" VALUES (10,'order','order');
INSERT INTO "django_content_type" VALUES (11,'order','orderitem');
INSERT INTO "django_content_type" VALUES (12,'accounts','user');
INSERT INTO "django_content_type" VALUES (13,'authtoken','token');
INSERT INTO "django_content_type" VALUES (14,'authtoken','tokenproxy');
INSERT INTO "django_content_type" VALUES (15,'API','foodcategory');
INSERT INTO "auth_permission" VALUES (1,1,'add_logentry','Can add log entry');
INSERT INTO "auth_permission" VALUES (2,1,'change_logentry','Can change log entry');
INSERT INTO "auth_permission" VALUES (3,1,'delete_logentry','Can delete log entry');
INSERT INTO "auth_permission" VALUES (4,1,'view_logentry','Can view log entry');
INSERT INTO "auth_permission" VALUES (5,2,'add_permission','Can add permission');
INSERT INTO "auth_permission" VALUES (6,2,'change_permission','Can change permission');
INSERT INTO "auth_permission" VALUES (7,2,'delete_permission','Can delete permission');
INSERT INTO "auth_permission" VALUES (8,2,'view_permission','Can view permission');
INSERT INTO "auth_permission" VALUES (9,3,'add_group','Can add group');
INSERT INTO "auth_permission" VALUES (10,3,'change_group','Can change group');
INSERT INTO "auth_permission" VALUES (11,3,'delete_group','Can delete group');
INSERT INTO "auth_permission" VALUES (12,3,'view_group','Can view group');
INSERT INTO "auth_permission" VALUES (13,4,'add_contenttype','Can add content type');
INSERT INTO "auth_permission" VALUES (14,4,'change_contenttype','Can change content type');
INSERT INTO "auth_permission" VALUES (15,4,'delete_contenttype','Can delete content type');
INSERT INTO "auth_permission" VALUES (16,4,'view_contenttype','Can view content type');
INSERT INTO "auth_permission" VALUES (17,5,'add_session','Can add session');
INSERT INTO "auth_permission" VALUES (18,5,'change_session','Can change session');
INSERT INTO "auth_permission" VALUES (19,5,'delete_session','Can delete session');
INSERT INTO "auth_permission" VALUES (20,5,'view_session','Can view session');
INSERT INTO "auth_permission" VALUES (21,6,'add_employee','Can add employee');
INSERT INTO "auth_permission" VALUES (22,6,'change_employee','Can change employee');
INSERT INTO "auth_permission" VALUES (23,6,'delete_employee','Can delete employee');
INSERT INTO "auth_permission" VALUES (24,6,'view_employee','Can view employee');
INSERT INTO "auth_permission" VALUES (25,7,'add_restaurant','Can add restaurant');
INSERT INTO "auth_permission" VALUES (26,7,'change_restaurant','Can change restaurant');
INSERT INTO "auth_permission" VALUES (27,7,'delete_restaurant','Can delete restaurant');
INSERT INTO "auth_permission" VALUES (28,7,'view_restaurant','Can view restaurant');
INSERT INTO "auth_permission" VALUES (29,8,'add_foods','Can add foods');
INSERT INTO "auth_permission" VALUES (30,8,'change_foods','Can change foods');
INSERT INTO "auth_permission" VALUES (31,8,'delete_foods','Can delete foods');
INSERT INTO "auth_permission" VALUES (32,8,'view_foods','Can view foods');
INSERT INTO "auth_permission" VALUES (33,9,'add_customer','Can add customer');
INSERT INTO "auth_permission" VALUES (34,9,'change_customer','Can change customer');
INSERT INTO "auth_permission" VALUES (35,9,'delete_customer','Can delete customer');
INSERT INTO "auth_permission" VALUES (36,9,'view_customer','Can view customer');
INSERT INTO "auth_permission" VALUES (37,10,'add_order','Can add order');
INSERT INTO "auth_permission" VALUES (38,10,'change_order','Can change order');
INSERT INTO "auth_permission" VALUES (39,10,'delete_order','Can delete order');
INSERT INTO "auth_permission" VALUES (40,10,'view_order','Can view order');
INSERT INTO "auth_permission" VALUES (41,11,'add_orderitem','Can add order item');
INSERT INTO "auth_permission" VALUES (42,11,'change_orderitem','Can change order item');
INSERT INTO "auth_permission" VALUES (43,11,'delete_orderitem','Can delete order item');
INSERT INTO "auth_permission" VALUES (44,11,'view_orderitem','Can view order item');
INSERT INTO "auth_permission" VALUES (45,12,'add_user','Can add user');
INSERT INTO "auth_permission" VALUES (46,12,'change_user','Can change user');
INSERT INTO "auth_permission" VALUES (47,12,'delete_user','Can delete user');
INSERT INTO "auth_permission" VALUES (48,12,'view_user','Can view user');
INSERT INTO "auth_permission" VALUES (49,13,'add_token','Can add Token');
INSERT INTO "auth_permission" VALUES (50,13,'change_token','Can change Token');
INSERT INTO "auth_permission" VALUES (51,13,'delete_token','Can delete Token');
INSERT INTO "auth_permission" VALUES (52,13,'view_token','Can view Token');
INSERT INTO "auth_permission" VALUES (53,14,'add_tokenproxy','Can add token');
INSERT INTO "auth_permission" VALUES (54,14,'change_tokenproxy','Can change token');
INSERT INTO "auth_permission" VALUES (55,14,'delete_tokenproxy','Can delete token');
INSERT INTO "auth_permission" VALUES (56,14,'view_tokenproxy','Can view token');
INSERT INTO "auth_permission" VALUES (57,15,'add_foodcategory','Can add food category');
INSERT INTO "auth_permission" VALUES (58,15,'change_foodcategory','Can change food category');
INSERT INTO "auth_permission" VALUES (59,15,'delete_foodcategory','Can delete food category');
INSERT INTO "auth_permission" VALUES (60,15,'view_foodcategory','Can view food category');
INSERT INTO "authtoken_token" VALUES ('841cce7265ecf1a75026a7396eb3478302743055','2021-03-26 08:34:05.227194',1);
INSERT INTO "authtoken_token" VALUES ('d7dbe749a6c57b1ec2b07e81e7b2174811b819f5','2021-05-16 12:19:14.841914',7);
INSERT INTO "authtoken_token" VALUES ('3b6af1b3e2ad724897053b199a526cb1cff9e0a8','2021-05-24 10:26:06.482519',12);
INSERT INTO "authtoken_token" VALUES ('6807b07511e4b9566b202127b20186bf856fdd2b','2021-06-03 08:59:24.718093',13);
INSERT INTO "authtoken_token" VALUES ('461d283e439ea327f61ad4da0fae563a25aa1d05','2021-06-03 09:05:00.301719',14);
INSERT INTO "authtoken_token" VALUES ('d8e66029608c2edd0f01a453893fb0f54a572c9d','2021-06-10 18:22:14.030367',15);
INSERT INTO "django_session" VALUES ('00txxgzpwga3a7oajqb604gksj65assn','.eJxVjDsOwyAQBe9CHSGWj4GU6X0GtCwQnERYMnYV5e6xJRdJOzPvvVnAba1h63kJU2JXBuzyyyLSM7dDpAe2-8xpbusyRX4k_LSdj3PKr9vZ_h1U7HVfI1mfwCgA60gYL0EUHFQ0JCHJLDXGQTmXEYsg8CoWJ8oOrUabNTj2-QLTdTe8:1lPhvK:4S39MXD0cZlaNJd1OMDZW9o32X6cnYXrZ5nNoOv8_NI','2021-04-09 08:34:30.690336');
INSERT INTO "django_session" VALUES ('lj8vglp95c8nc9b8sikvad3lvuoj5ubj','.eJxVjDsOwyAQBe9CHSGWj4GU6X0GtCwQnERYMnYV5e6xJRdJOzPvvVnAba1h63kJU2JXBuzyyyLSM7dDpAe2-8xpbusyRX4k_LSdj3PKr9vZ_h1U7HVfI1mfwCgA60gYL0EUHFQ0JCHJLDXGQTmXEYsg8CoWJ8oOrUabNTj2-QLTdTe8:1lSQ26:A8BxVBReVMdZ0Bap7IluzRF-oQG9Ci8OA0I1XHLWgEs','2021-04-16 20:04:42.621031');
INSERT INTO "django_session" VALUES ('zo3xai1jljze26w6s399gy3udufu5v2x','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-05-29 19:08:32.673499');
INSERT INTO "django_session" VALUES ('bu5h4ifdi0ybdraehdas6cqg4xvypo3y','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-05-30 10:07:54.210259');
INSERT INTO "django_session" VALUES ('ltbrasm01bhgxotj9dahm40plx6fpkci','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-06-04 12:07:02.173351');
INSERT INTO "django_session" VALUES ('0r9sbjsh5nuq3wblb1l1umah9ecfkrt8','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-06-07 09:46:20.524559');
INSERT INTO "django_session" VALUES ('np6lvpkgfrnbr4xaqk5r5xfr3p31xn7y','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-06-14 15:04:16.726657');
INSERT INTO "django_session" VALUES ('s1i9do1sc22fqx48n2yzblmyawwch31s','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-06-20 20:02:10.674839');
INSERT INTO "django_session" VALUES ('f0i2wyghckkufexznkncl8noqsuknoct','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-06-22 17:56:23.219684');
INSERT INTO "django_session" VALUES ('pmqfm9jsf36q6t3eecly0dihjym9r1c8','NGIwNTE0NDRiNTI5NWIyZmZhZTNmZTQxNDQzMmU2ZDBmNzczYWQxNzp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkYmQ2ZDMxMDcwYWEwNTY5NWQ5ZTMwMjQzMDNhNDBjODUzNzEwMGU0In0=','2021-06-24 18:19:09.551073');
INSERT INTO "API_foodcategory" VALUES (6,'pizza','this is pizza food description');
INSERT INTO "API_foodcategory" VALUES (7,'Sea Food','this is Sea Food Description');
INSERT INTO "API_foodcategory" VALUES (8,'Beverages','beverages Description');
INSERT INTO "API_foodcategory" VALUES (9,'Non-Veg','meat Items');
INSERT INTO "API_foodcategory" VALUES (10,'veg','veg description');
INSERT INTO "API_foods" VALUES (7,'Pizza','Foods/maxresdefault_goXVNDJ.jpg',232.0,4,'this is a pizza',6,5.0);
INSERT INTO "API_foods" VALUES (8,'Fish Fry','Foods/fishfry.jpg',534.0,1,'Fish Description',7,4.8);
INSERT INTO "API_foods" VALUES (9,'Coffee Coffee Coffee Coffee','Foods/coffee.jpg',30.0,2,'Cafe Descrtions',8,4.65);
INSERT INTO "API_foods" VALUES (10,'Goat Meat','Foods/goat-mutton-curry-1957594-hero-01-afaf638173cd47d595c7ad99a018cf01.jpg',430.0,3,'This is Description of Goat Meat',9,4.3);
INSERT INTO "API_foods" VALUES (22,'Salad','Foods/Mediterranean_Salad_sRAqv8I.jpg',231.0,5,'this is salad discription',10,4.3);
INSERT INTO "API_foods" VALUES (25,'vjvj','Foods/foodItem_xCCHr1a.jpg',567.0,5,'gjnk',9,4.4);
INSERT INTO "API_restaurant" VALUES (1,'GoldFish','Restaurant/goldfish.png','Kot Khalsa',4.4,NULL,1);
INSERT INTO "API_restaurant" VALUES (2,'Cafe Coffee day','Restaurant/cafe.jpg','Rani ka Bagh',4.8,'kljf',1);
INSERT INTO "API_restaurant" VALUES (3,'Food Hub','Restaurant/foodhub.png','RamBagh',3.6,NULL,1);
INSERT INTO "API_restaurant" VALUES (4,'Pizzeria','Restaurant/pizzeria.jpg','Rani Ka Bagh',4.9,'this is description',1);
INSERT INTO "API_restaurant" VALUES (5,'Brother Dhaba','Restaurant/brothers-dhaba-khandwala-amritsar-dhaba-restaurants-r599vy6xn2.jpg','Khandwala',4.2,'this is description of Brother Dhaba',12);
INSERT INTO "order_order" VALUES (1,'win win','new@new.com','7894561235','this is address','2021-06-05 20:48:51.807358','2021-06-05 20:48:51.807358',0,'FootApp#4400','',0,0,0,'');
INSERT INTO "order_order" VALUES (2,'win win','new@new.com','7894561235','this is address','2021-06-05 20:53:32.612728','2021-06-09 15:52:08.389263',0,'FootApp#440001','this@this.com',0,0,0,'');
INSERT INTO "order_order" VALUES (3,'x','ths@ths.com','832942938','this is address','2021-06-05 20:55:26.325175','2021-06-09 16:20:10.670037',0,'FootApp#440002','new@new.com',0,0,0,'');
INSERT INTO "order_order" VALUES (4,'x','ths@ths.com','832942938','this is address','2021-06-05 20:55:44.516740','2021-06-09 17:54:03.569929',0,'FootApp#440003','salad',0,0,0,'');
INSERT INTO "order_order" VALUES (5,'x','ths@ths.com','832942938','this is address','2021-06-05 21:07:59.497814','2021-06-09 15:44:28.996762',0,'FootApp#440004','cal',0,1,1,'');
INSERT INTO "order_order" VALUES (6,'this','make@maker.com','852147963','this is address','2021-06-08 19:19:29.019478','2021-06-10 18:43:07.893120',0,'FootApp#440005','basic@basic.com',0,0,0,'');
INSERT INTO "order_order" VALUES (7,'win win','new@new.com','7894561235','this is address','2021-06-09 09:24:53.468755','2021-06-10 10:24:48.242936',0,'FootApp#440006','qeroujqweo',0,0,1,'');
INSERT INTO "order_order" VALUES (8,'adkfj','kadljf@this.com','kadjf','kadjf','2021-06-09 19:01:18.788347','2021-06-10 10:25:22.403547',0,'FootApp#440007','adflj',0,1,1,'');
INSERT INTO "order_order" VALUES (9,'jakdfj','kadkl@gmail.com','kadjflak','kajdflk','2021-06-09 19:02:00.546212','2021-06-09 19:02:00.546212',0,'FootApp#440008','adfk',0,1,1,'');
INSERT INTO "order_order" VALUES (10,'alkdfj','falj@this.com','ajdfkja','lkajdfl','2021-06-09 19:03:07.683620','2021-06-10 15:56:39.889127',0,'FootApp#440009','adfkj',0,0,1,'');
INSERT INTO "order_orderitem" VALUES (72,30,4,9,1);
INSERT INTO "order_orderitem" VALUES (73,430,1,10,1);
INSERT INTO "order_orderitem" VALUES (74,534,2,8,2);
INSERT INTO "order_orderitem" VALUES (75,30,3,9,2);
INSERT INTO "order_orderitem" VALUES (77,30,3,9,3);
INSERT INTO "order_orderitem" VALUES (78,430,2,10,3);
INSERT INTO "order_orderitem" VALUES (79,534,2,8,4);
INSERT INTO "order_orderitem" VALUES (81,534,4,8,5);
INSERT INTO "order_orderitem" VALUES (82,30,3,9,5);
INSERT INTO "order_orderitem" VALUES (83,430,1,10,5);
INSERT INTO "order_orderitem" VALUES (89,534,3,8,7);
INSERT INTO "order_orderitem" VALUES (90,30,2,9,7);
INSERT INTO "order_orderitem" VALUES (93,434,1,22,8);
INSERT INTO "order_orderitem" VALUES (94,342,1,22,9);
INSERT INTO "order_orderitem" VALUES (95,232,1,22,10);
INSERT INTO "accounts_user" VALUES (1,'pbkdf2_sha256$180000$YxcLFH7yhWGC$AVtw1tcQcV6j9mK2i9lq+EnegGy2vJQ9TLRpYvnaY2Q=','2021-06-10 18:19:09.530129','admin','admin@admin.com',1,1,'this is address field','adm','512x491.png','42','Ajay kumar');
INSERT INTO "accounts_user" VALUES (7,'pbkdf2_sha256$180000$YFSGu9XwVrRD$Nc22gmxw93UZ3dIAsvtTIZC4JbtQ0OoVcLASQIPq2nA=',NULL,'b','b@b.com',1,0,'','cus','','42','Ajay kumar');
INSERT INTO "accounts_user" VALUES (12,'pbkdf2_sha256$180000$3luBvu2BCsgw$AeltjuEI4+wi7mhNQ3jN28tf86gZRykeoYgPCL1MRV8=',NULL,'new','new@new.com',1,0,'New da address','man','handsome-confident-smiling-man-with-hands-crossed-chest_1621100760.png','7894561235','win win');
INSERT INTO "accounts_user" VALUES (13,'pbkdf2_sha256$180000$7SAuS155jgEY$AWfrU9GPNMCAdkJWi5ZFOgv+MFv9SWlKiHuO6mB6enY=',NULL,'basic','basic@basic.com',1,0,'','cus','','8738297382','this is');
INSERT INTO "accounts_user" VALUES (14,'pbkdf2_sha256$180000$4KyaNbUV3SOA$thKwLpM6aOlrwZ6bfss8E1ZoEwFFE3+wmm1M8l0/hCw=',NULL,'bs','bs@bs.com',1,0,'','man','','7689274829','this');
INSERT INTO "accounts_user" VALUES (15,'pbkdf2_sha256$180000$VCEaFIwNG8Ma$2y0dkVu0JDaS11NDYmgRA4h+wzfSMp+xJ9R1y9bOGms=',NULL,'big','big@big.com',1,0,'','da','','7939272788','Ashok');
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
CREATE INDEX IF NOT EXISTS "API_foods_res_name_id_03aef32c" ON "API_foods" (
	"res_name_id"
);
CREATE INDEX IF NOT EXISTS "API_foods_food_cat_id_c210047a" ON "API_foods" (
	"food_cat_id"
);
CREATE INDEX IF NOT EXISTS "API_restaurant_user_id_ef308c94" ON "API_restaurant" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "order_orderitem_product_id_c5c6b07a" ON "order_orderitem" (
	"product_id"
);
CREATE INDEX IF NOT EXISTS "order_orderitem_order_id_aba34f44" ON "order_orderitem" (
	"order_id"
);
COMMIT;
