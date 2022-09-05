create table barbers (
    id serial primary key  not null,
    barber_name varchar(50) not null,
    barber_email text not null,
    barber_password text not null
);

create table customers (
    id serial primary key not null,
    customer_name varchar(50) not null,
    customer_email text not null,
    customer_password text not null
);

create table reserves (
    id serial not null,
    reserve_date timestamptz not null,
    customer_id integer not null references customers(id),
    barber_id integer not null references barbers(id)
);