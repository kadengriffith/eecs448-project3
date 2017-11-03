<?php
	$leaderboard = new mysqli("mysql.eecs.ku.edu", "mtaylor", 'P@$$word123', "mtaylor");
	if($leaderboard->connect_errno) {
		printf("Connetion failed: %s\n", $leaderboard->connect_error);
		exit();
	}
	$query = "UPDATE Leaderboard SET wins = wins + 1 WHERE color = " . $color;
	$leaderboard->query($query);
	$leaderboard->close();
?>