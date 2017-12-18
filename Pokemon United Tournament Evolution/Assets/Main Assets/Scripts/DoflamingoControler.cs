using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DoflamingoControler : MonoBehaviour {
    private Animator animateur;
    public Transform Player;
    public Transform Allies;
    public float speed = 2f;
    private float minDistance = 0.2f;
    private float distance = 2;
    private float rangePlayer;
    Rigidbody2D body;
    public AudioClip impactSound;
    public AudioClip deathSound;
    public AudioClip laughtSound;

    // Use this for initialization
    void Start()
    {
        animateur = this.GetComponent<Animator>();
        body = this.GetComponent<Rigidbody2D>();
    }

    void Update()
    {
        Player = GameObject.FindWithTag("Player").transform;

        rangePlayer = Vector2.Distance(transform.position, Player.position);

        if (rangePlayer > minDistance)
        {
            transform.position = Vector2.MoveTowards(transform.position, Player.position, speed * Time.deltaTime);
        }
        if (rangePlayer < distance)
        {
            animateur.SetTrigger("AttackKick");
        }

        if (Player.position.x > transform.position.x)
        {
            //face right
            transform.localScale = new Vector3(-2, 2, 1);
        }
        else if (Player.position.x < transform.position.x)
        {
            //face left
            transform.localScale = new Vector3(2, 2, 1);
        }
    }
    void OnTriggerEnter2D(Collider2D other)
    {

        //Checks if other gameobject has a Tag of Player
        if (other.gameObject.tag == "Player" && GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Health < 0)
        {
            GameObject.FindGameObjectWithTag("Player").GetComponent<AudioSource>().Stop();
            GameObject.FindGameObjectWithTag("Enemies").GetComponent<AudioSource>().Stop();
            GameObject.FindGameObjectWithTag("Scene").GetComponent<AudioSource>().Stop();
            if (!GameObject.FindGameObjectWithTag("Player").GetComponent<AudioSource>().isPlaying)
                GameObject.FindGameObjectWithTag("Player").GetComponent<AudioSource>().PlayOneShot(deathSound);
            GameObject.Find("Life").GetComponent<LifeKeeper>().life = GameObject.Find("Life").GetComponent<LifeKeeper>().life - 1;
            other.gameObject.GetComponent<PlayerController>().alive = false;
            Time.timeScale = 0;

        }
        else if (other.gameObject.tag == "Player" && GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().takeDamage == true)
        {
            /*// how much the character should be knocked back
            int magnitude = 50;
            // calculate force vector
            Vector3 force = transform.position - other.transform.position;
            // normalize force vector to get direction only and trim magnitude
            force.Normalize();
            GameObject.FindGameObjectWithTag("Player").GetComponent<Rigidbody2D>().AddForce(-force * magnitude);*/

            //GameObject.FindGameObjectWithTag("Player").GetComponent<Animator>().SetTrigger("Hit");
            GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Health = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Health - 0.025;
            GameObject.FindGameObjectWithTag("Health").GetComponent<GUIBarScript>().SetNewValue(GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Health);
            GameObject.FindGameObjectWithTag("Health").GetComponent<GUIBarScript>().ForceUpdate();
            if (!GameObject.FindGameObjectWithTag("Player").GetComponent<AudioSource>().isPlaying)
                GameObject.FindGameObjectWithTag("Player").GetComponent<AudioSource>().PlayOneShot(impactSound);
            if (!this.GetComponent<AudioSource>().isPlaying)
                this.GetComponent<AudioSource>().PlayOneShot(laughtSound);
        }
        else if (other.gameObject.tag == "Allies")
        {
            GameObject.FindGameObjectWithTag("Allies").GetComponent<JinbeyController>().health = GameObject.FindGameObjectWithTag("Allies").GetComponent<JinbeyController>().health - 0.025;
        }
    }

    private void FixedUpdate()
    {
    }
}
