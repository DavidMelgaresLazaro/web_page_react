-- base de datos gamexx

-- borrar si existe y crear base de datos
drop database if exists gamexx;
create database gamexx;

-- usar base de datos
use gamexx;




create table users (
id INT primary key auto_increment,
name varchar(50) not null,
email varchar(50) not null,
password varchar(1000) not null,
role ENUM('admin','user') not null,
address varchar(50) not null,
created_at DATETIME not null default(now()),
modified_at DATETIME not null default(now())
);

create table categories(
id INT primary key auto_increment,
name varchar(100) not null
);

create table products (
id INT primary key auto_increment,
name varchar(50) not null,
description varchar(250) not null,
category_id INT,
    CONSTRAINT fk_category_products FOREIGN KEY (category_id) REFERENCES categories(id),
price DECIMAL(3,2) not null,
stock INT not null,
image_url varchar(255) not null
);



create table cart (
id INT primary key auto_increment,
user_id INT,
	 CONSTRAINT fk_user_cart FOREIGN KEY (user_id) REFERENCES users(id),
total INT not null,
date DATETIME not null default(now())
);

create table cart_items (
id INT primary key auto_increment,
cart_id INT,
	 CONSTRAINT fk_cart_id FOREIGN KEY (cart_id) REFERENCES cart(id),
quantity INT not null	 
);

create table orders (
id INT primary key auto_increment,
user_id INT,
	constraint fk_orders_users foreign key (user_id) references users(id),
date DATETIME not null default(now()),
status ENUM('pending','processing','shipped','delivered') not null,
total_amount INT not null
);

create table order_items(
id INT primary key auto_increment,
order_id INT,
	constraint fk_orders_id foreign key (order_id) references orders(id),
product_id INT,
	constraint fk_product_id foreign key (product_id) references products(id),
quantity INT not null,
unit_price INT not null
);
