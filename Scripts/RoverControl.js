#pragma strict

public var roverMovement : RoverMovement;
public var metalDetection : MetalDetection;
public var bumpSimulation : BumpSimulation;

public var bumpsOn : boolean;

public var systemPaused : boolean;

function Start () {

	roverMovement = GetComponent(RoverMovement);
	metalDetection = GetComponent(MetalDetection);
	bumpSimulation = GetComponent(BumpSimulation);
//	bumpsOn = true;

}

function Update () {

}