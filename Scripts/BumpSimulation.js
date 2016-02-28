#pragma strict

public var roverMovement : RoverMovement;
public var roverControl : RoverControl;

var bumpDegrees : float;
var bumpTicker : float;

function Start () {
	roverMovement = GetComponent(RoverMovement);
	roverControl = GetComponent(RoverControl);

	newBump();
}

function newBump(){
	bumpTicker = Random.Range(2.0, 10.0);
	bumpDegrees = Random.Range(-10.0, 10.0);

}

function Bump(degrees : float){

	transform.Rotate(Vector3.up, degrees);
	Debug.Log("Bump! Degrees: " + transform.eulerAngles.y);
}

function Update () {

	if(roverMovement.mode == "moveLong" && roverControl.bumpsOn == true && roverControl.systemPaused == false){

		bumpTicker -= Time.deltaTime;

		 if(bumpTicker <= 0){
			Bump(bumpDegrees);
		 	newBump();
		 } 
	}
}

