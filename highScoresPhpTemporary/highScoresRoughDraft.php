//The line used to create the table is below... (created on blaines EECS MYSQL server)
//CREATE TABLE Teams ( team_id int NOT NULL AUTO_INCREMENT, team_color text NOT NULL, team_score int NOT NULL, team_wins int NOT NULL, team_losses int NOT NULL, PRIMARY KEY (team_id) );
//Update: table is live on blaines MYSQL server. "test" is the data base. (use test);
<?php

	$teamToUpdate = $_POST["teamColor"];
	
	$pointsToAdd = $_POST["pointsAdd"];
	
	 //eventually this will be kadens server
	$data_base = new mysqli("mysql.eecs.ku.edu", "bedmondson", 'P@$$word.123', "test");
	
	if($data_base->connect_errno)
	{
		printf("Unable to reach server: %s\n", $data_base->connect_error);
		//add return to post game or main game page?
		exit();
	}
	//might need to change the single quotes to double quotes for the team colors
	if($teamToUpdate != ( 'redTeam' || 'blueTeam' || 'yellowTeam' || 'greenTeam' ))//should also add a check to see if its one of the 4 teams... (add later)
	{
		echo "Something went wrong with the name variable, Try again later.";
		//add return to post game or main game page?
		exit();
	}
	
	if( $pointsToAdd == 0)
	{
		echo "No points to add? Something went wrong. (line #null) ";
		//add return to post game or main game page?
		exit();
	}
	//the line below will be to check how many points the team already has.---
	//$query = /*still not sure */
	
	//<do math here (add old score to new one)>
	$pointsToAdd = $pointsToAdd + $oldPoints;
	
	//the line below will be to update the score--- (its not tested yet)
	$insert = "INSERT INTO Teams (NULL<><><><><><><><>) VALUES ('" . $pointsToAdd . "', (SELECT team_color FROM Teams WHERE team_color='" . $teamToUpdate . "'))";
	
	
	
	
	
	
	
	
	
	
?>