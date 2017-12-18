using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LifeKeeper : MonoBehaviour {
    public int life = 3;
    // Use this for initialization
    void Start () {
		
	}
    private void Awake()
    {
        DontDestroyOnLoad(transform.gameObject);

        if (FindObjectsOfType(GetType()).Length > 1)
        {
            Destroy(gameObject);
        }
    }
    // Update is called once per frame
    void Update () {
		
	}
}
