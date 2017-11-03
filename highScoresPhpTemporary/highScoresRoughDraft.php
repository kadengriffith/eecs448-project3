//getting the template ready
//Line used to create the table below... (on my EECS MYSQL server)
//CREATE TABLE Teams ( team_id int NOT NULL AUTO_INCREMENT, team_color text NOT NULL, team_score int NOT NULL, team_wins int NOT NULL, team_losses int NOT NULL, PRIMARY KEY (team_id) );
//Update: table is live on blaines MYSQL server. "test" is the data base. (use test);
<?php

//might need to make this the 

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
	
	if(strlen($teamToUpdate) == 0)
	{
		echo "Something went wrong, Try again later.";
		//add return to post game or main game page?
		exit();
	}
	
	if( $pointsToAdd == 0)
	{
		echo "No points to add? Something went wrong. (line #null) ";
		//add return to post game or main game page?
		exit();
	}


?>