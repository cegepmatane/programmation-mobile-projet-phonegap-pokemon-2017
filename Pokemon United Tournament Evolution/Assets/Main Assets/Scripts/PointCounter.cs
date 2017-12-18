using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PointCounter : MonoBehaviour {

    public int score;

    // Use this for initialization
    void Start()
    {
        score = 0;
    }

    // Update is called once per frame
    void Update()
    {
        if(score >= 30)
        {
            SceneManager.LoadScene("Victory");
        }
    }
}
