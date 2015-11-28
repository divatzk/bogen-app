<?php
define(DB_LOCAL_USER, "root");
define(DB_LOCAL_PASSWORD, "");
define(DB_LOCAL_DATABASE, "bogen");
define(DB_LOCAL_HOST, "localhost");

define(DB_PROD_USER, "TODO");
define(DB_PROD_PASSWORD, "TODO");
define(DB_PROD_DATABASE, "TODO");
define(DB_PROD_HOST, "TODO");

function getDBConnection() {
	$isdevelopment = strpos($_SERVER['HTTP_HOST'], DB_LOCAL_HOST) !== false;
	$dbhost = $isdevelopment ? DB_LOAL_HOST : DB_PROD_HOST;
	$dbuser = $isdevelopment ? DB_LOCAL_USER : DB_PROD_HOST;
	$dbpass = $isdevelopment ? DB_LOCAL_PASSWORD : DB_PROD_PASSWORD;
	$dbname = $isdevelopment ? DB_LOCAL_DATABASE : DB_PROD_DATABASE;
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}
