#pragma strict

public var roverMovement : RoverMovement;
public var bottomCamera : GameObject;

var stopDelayTicker : float;
var photographDelayTicker : float;
var stopDelayDuration : float;
var photographDelayDuration : float;
var mode = "detecting";

function Start () {
	roverMovement = GetComponent(RoverMovement);

	stopDelayDuration = 0.8;
	photographDelayDuration = 1.0;
	stopDelayTicker = stopDelayDuration;
	photographDelayTicker = photographDelayDuration;

}

function Update () {

	if(mode == "stopping"){
		Stop();
	}
	if(mode === "photographing"){
		Photograph();
	}

//	Debug.Log(roverMovement.paused);
//	Debug.Log(mode);

}

function Stop(){
	stopDelayTicker -= Time.deltaTime;
	if(stopDelayTicker <= 0){
		roverMovement.paused = true;
		mode = "photographing";
	}
}

function Photograph(){
	photographDelayTicker -= Time.deltaTime;
	bottomCamera.GetComponent(Light).intensity = 0.3;

	if(photographDelayTicker <= 0){
		roverMovement.paused = false;
		mode = "detecting";
		stopDelayTicker = stopDelayDuration;
		photographDelayTicker = stopDelayDuration;
		bottomCamera.GetComponent(Light).intensity = 0.0;

	}
}

function OnTriggerEnter (other: Collider)
{
	Debug.Log("Collision");
	other.gameObject.GetComponent(BoxCollider).enabled = false;
	
	if(mode == "detecting" && roverMovement.mode == "moveLong"){
		mode = "stopping";
		Debug.Log("called");
	}

}

