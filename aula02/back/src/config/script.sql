create database aulas;

create table if not exists filmes(
	id serial primary key,
	titulo varchar(150) not null,
	genero varchar(100) not null,
	ano int not null,
	imagem_url text
);
