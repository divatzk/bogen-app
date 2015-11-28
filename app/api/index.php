<?php

require 'config.php';
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->get('/games', 'getGames');
$app->post('/games', 'addGame');
$app->run();

function getGames() {
	$sql = "SELECT * FROM Game ORDER BY date DESC";
	try {
		$db = getDBConnection();
		$stmt = $db->query($sql);
		$results = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

    foreach ($results as &$value) {
        $value->data = unserialize($value->data);
    }
    $json = json_encode($results);
		echo '{"game": ' . $json . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addGame() {
  	$request = \Slim\Slim::getInstance()->request();
	$menu = json_decode($request->getBody());

  	$sql1 = "SELECT count(*) FROM Game WHERE uid = :uid";
  	$sql2 = "INSERT INTO Game (data, uid, type) VALUES (:data, :uid, :type)";
  	$sql3 = "UPDATE Game SET data=:data WHERE uid=:uid";
	try {
		$db = getDBConnection();
		$stmt = $db->prepare($sql1);
		$stmt->bindParam("uid", $menu->uid);
		$stmt->execute();
  		$mode_add = !$stmt->fetchColumn() > 0;
    	if ($mode_add){
      		$stmt2 = $db->prepare($sql2);
      		$stmt2->bindParam("data", serialize($menu->data));
      		$stmt2->bindParam("uid", $menu->uid);
      		$stmt2->bindParam("type", $menu->type);
      		$stmt2->execute();
    	} else {
      		$stmt3 = $db->prepare($sql3);
      		$stmt3->bindParam("data", serialize($menu->data));
      		$stmt3->bindParam("uid", $menu->uid);
      		$stmt3->execute();
    	}
    	$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}
