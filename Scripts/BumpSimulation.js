#pragma strict

public var roverMovement : RoverMovement;

var bumpDegrees : float;
var bumpTicker : float;



function Start () {
	roverMovement = GetComponent(RoverMovement);

//	bumpMagnitude = 1.0;

	newBump();




}

function newBump(){
	bumpTicker = Random.Range(2.0, 10.0);
	bumpDegrees = Random.Range(-10.0, 10.0);

//	Debug.Log("bump ticker: " + bumpTicker);
}



function Update () {

	bumpTicker -= Time.deltaTime;

	 if(bumpTicker <= 0){
	 	//apply bump to RoverMovement
	 	roverMovement.Bump(bumpDegrees);
//	 	Debug.Log("Bump! " + bumpDegrees );
	 	newBump();
	 } 


}

