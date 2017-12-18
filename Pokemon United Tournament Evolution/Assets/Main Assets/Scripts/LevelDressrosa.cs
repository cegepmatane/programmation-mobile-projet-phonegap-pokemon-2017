using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelDressrosa : MonoBehaviour {

	// Use this for initialization
	void Start () {
        GameObject.Find("CurrentLevel").GetComponent<LastLevel>().levelSelected = 1;
    }
	
	// Update is called once per frame
	void Update () {
		
	}
}
