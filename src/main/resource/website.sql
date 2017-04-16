drop table if exists w_attachment;
create table w_attachment (
	id int primary key auto_increment,
	type_id varchar(50) not null comment '类型id',
	path varchar(100) not null comment '附件路径',
	is_deleted char(1) not null default 'N' comment '是否删除',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '附件表';

drop table if exists w_attachment_obj;
create table w_attachment_obj (
	id int primary key auto_increment,
	attachment_id int not null comment '附件id',
	obj_id int not null comment '对象id',
	type_id int not null comment '类型id',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '附件中间表';

drop table if exists w_const;
create table w_const (
	id int primary key auto_increment,
	type varchar(25) not null comment '类型',
	code varchar(100) not null comment '编号',
	value varchar(100) not null comment '值',
	description varchar(255) comment '备注',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '常量表';
insert into w_const(type, code, value, description, created_by, updated_by) values('user_type', '1', 'user', '普通用户', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('user_type', '2', 'admin', '管理员', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('user_type', '3', 'supplier', '供货商', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('sex', '1', 'man', '男', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('sex', '2', 'woman', '女', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('file', '1', 'material_img', '材料图片', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('file', '2', 'product_img', '商品图片', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('product', '1', 'product_property', '商品属性', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('product', '2', 'materia_property', '商品材料属性', 1, 1);
insert into w_const(type, code, value, description, created_by, updated_by) values('product_category', '1', 'hot', '热销商品', 1, 1);

drop table if exists w_user;
create table w_user (
	id int primary key auto_increment,
	username varchar(30) not null comment '用户名',
	real_name varchar(20) comment '真实姓名',
	password varchar(255) not null comment '密码',
	is_valid char(1) not null default 'Y' comment '是否有效',
	status varchar(10) not null default 'N' comment '状态',
	age int comment '年龄',
	sex char(1) not null default '1' comment '性别：1（男，默认）、2（女）',
	type_id varchar(10) not null default 'user' comment '用户类型',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '用户表';

drop table if exists w_supply;
create table w_supply(
	id int primary key auto_increment,
	user_id int not null comment '用户id',
	is_valid char(1) not null default 'N' comment '是否有效',
	is_deleted char(1) not null default 'N' comment '是否删除',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '供应商表';

insert into w_supply(user_id, is_valid, created_by, updated_by) values(2, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(3, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(4, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(5, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(6, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(7, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(8, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(9, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(10, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(11, 'Y', 1, 1);
insert into w_supply(user_id, is_valid, created_by, updated_by) values(12, 'Y', 1, 1);

drop table if exists w_product;
create table w_product (
	id int primary key auto_increment,
	name varchar(100) not null comment '商品名称',
	category_id int not null comment '分类id',
	code varchar(255) not null comment '商品编号',
	is_valid char(1) not null default 'Y' comment '是否有效',
	status varchar(10) not null default 'N' comment '状态：N（新增）、P（审核通过）、F（审核失败）、S（特价处理中）',
	price double not null comment '价格',
	count int not null default 0 comment '库存',
	special_price double not null comment '特价',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '商品表';

drop table if exists w_material;
create table w_material (
	id int primary key auto_increment,
	name varchar(100) not null comment '材料名称',
	category_id int not null comment '分类id',
	code varchar(255) not null comment '材料编号',
	is_valid char(1) not null default 'Y' comment '是否有效',
	status varchar(10) not null default 'N' comment '状态：N（新增）、P（审核通过）、F（审核失败）',
	price double not null comment '价格',
	special_price double not null comment '特价',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '材料表';

drop table if exists w_category;
create table w_category (
	id int primary key auto_increment,
	name varchar(20) not null comment '分类名称',
	type_id int not null comment '常量表中type=product的id，材料或商品',
	is_valid char(1) default 'Y' comment '是否有效',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '分类表';

drop table if exists w_property;
create table w_property (
	id int primary key auto_increment,
	name varchar(20) not null comment '属性名称',
	type_id int not null comment '常量表中type=product的id，材料或商品',
	is_must char(1) default 'Y' comment '是否必填',
	is_valid char(1) default 'Y' comment '是否有效',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '属性表';

drop table if exists w_property_category;
create table w_property_category (
	id int primary key auto_increment,
	property_id int not null comment '属性id',
	category_id int not null comment '分类id',
	is_valid char(1) default 'Y' comment '是否有效',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '属性分类表';

drop table if exists w_property_obj;
create table w_property_obj (
	id int primary key auto_increment,
	property_id int not null comment '属性id，为空时：该属性是自定义',
	category_id int not null comment '分类id',
	obj_id int not null comment '实体id:当分类为商品时，obj_id指向商品；否则指向material',
	value varchar(50) not null comment '属性值',
	create_date datetime not null default now() comment '创建时间',
	update_date datetime not null default now() comment '最后修改时间',
	created_by int not null comment '创建人id',
	updated_by int not null comment '最后修改人'
) ENGINE = INNODB comment '实体属性中间表';