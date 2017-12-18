using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class UI_Manager : MonoBehaviour {

    GameObject[] pauseObjects;
    PlayerController playerController;
    Scene scene;

    // Use this for initialization
    void Start()
    {
        Time.timeScale = 1;

        pauseObjects = GameObject.FindGameObjectsWithTag("ShowOnPause");            //gets all objects with tag ShowOnPause

        scene = SceneManager.GetActiveScene();

        hidePaused();

        //Checks to make sure MainLevel is the loaded level
        if (scene.name == "GameOver" || scene.name == "Victory") return;
        else playerController = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>();
    }

    // Update is called once per frame
    void Update()
    {
        if (scene.name == "GameOver" || scene.name == "Victory")
            return;
        else
        {
            //uses the p button to pause and unpause the game
            if (Input.GetKeyDown(KeyCode.P))
            {
                if (Time.timeScale == 1 && playerController.alive == true)
                {
                    Time.timeScale = 0;
                    showPaused();
                }
                else if (Time.timeScale == 0 && playerController.alive == true)
                {
                    Time.timeScale = 1;
                    hidePaused();
                }
            }

            //shows finish gameobjects if player is dead and timescale = 0
            if (Time.timeScale == 0 && playerController.alive == false)
            {
                //showFinished();
                if(GameObject.Find("Life").GetComponent<LifeKeeper>().life > 0)
                {
                    Reload();
                }
                else
                {
                    GameObject.Find("Life").GetComponent<LifeKeeper>().life = 3;
                    LoadLevel("GameOver");
                }
            }
        }
    }


    //Reloads the Level
    public void Reload()
    {
        if(GameObject.Find("CurrentLevel").GetComponent<LastLevel>().levelSelected == 1)
        {
            SceneManager.LoadScene("OnePieceGame");
        }
        else if(GameObject.Find("CurrentLevel").GetComponent<LastLevel>().levelSelected == 2)
        {
            SceneManager.LoadScene("Marineford");
        }
    }

    public void NextLevel()
    {
        if (GameObject.Find("CurrentLevel").GetComponent<LastLevel>().levelSelected == 1)
        {
            SceneManager.LoadScene("Marineford");
        }
        else if (GameObject.Find("CurrentLevel").GetComponent<LastLevel>().levelSelected == 2)
        {
            SceneManager.LoadScene("OnePieceGame");
        }
    }


    //controls the pausing of the scene
    public void pauseControl()
    {
        if (Time.timeScale == 1)
        {
            Time.timeScale = 0;
            showPaused();
        }
        else if (Time.timeScale == 0)
        {
            Time.timeScale = 1;
            hidePaused();
        }
    }

    //shows objects with ShowOnPause tag
    public void showPaused()
    {
        foreach (GameObject g in pauseObjects)
        {
            g.SetActive(true);
        }
    }

    //hides objects with ShowOnPause tag
    public void hidePaused()
    {
        foreach (GameObject g in pauseObjects)
        {
            g.SetActive(false);
        }
    }

    //loads inputted level
    public void LoadLevel(string level)
    {
        SceneManager.LoadScene(level);
    }
}
