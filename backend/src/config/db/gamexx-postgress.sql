-- base de datos gamexx Postgress

-- borrar si existe y crear base de datos
-- drop database if exists gamexx;
--create database gamexx;

-- usar base de datos

drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists cart_items cascade;
drop table if exists cart cascade;
drop table if exists products cascade;
drop table if exists categories cascade;
drop table if exists users cascade;

drop type if exists order_status cascade;
drop type if exists role_type cascade;

create type order_status as enum('pending','processing','shipped','delivered');
create type role_type as enum('admin','user');


create table users (
id SERIAL primary key,
name varchar(50) not null,
email varchar(50) not null,
password varchar(1000) not null,
role role_type not null default 'user',
address varchar(50) not null,
created_at TIMESTAMP not null default(now()),
modified_at TIMESTAMP not null default(now())
);

create table categories(
id SERIAL primary key,
name varchar(100) not null
);

create table products (
id SERIAL primary key,
name varchar(50) not null,
description varchar(250) not null,
category_id INT,
    CONSTRAINT fk_category_products FOREIGN KEY (category_id) REFERENCES categories(id),
price DECIMAL(3,2) not null,
stock INT not null,
image_url varchar(255) not null
);



create table cart (
id SERIAL primary key,
user_id INT,
	 CONSTRAINT fk_user_cart FOREIGN KEY (user_id) REFERENCES users(id),
total INT not null,
date TIMESTAMP not null default(now())
);

create table cart_items (
id SERIAL primary key,
cart_id INT,
	 CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES cart(id),
quantity INT not null	 
);

create table orders (
id SERIAL primary key,
user_id INT,
	constraint fk_orders_users foreign key (user_id) references users(id),
date TIMESTAMP not null default(now()),
status order_status not null default 'pending',
total_amount INT not null
);

create table order_items(
id SERIAL primary key,
order_id INT,
	constraint fk_orders_id foreign key (order_id) references orders(id),
product_id INT,
	constraint fk_product_id foreign key (product_id) references products(id),
quantity INT not null,
unit_price INT not null
);
