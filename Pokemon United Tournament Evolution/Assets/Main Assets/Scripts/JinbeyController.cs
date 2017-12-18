using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class JinbeyController : MonoBehaviour
{
    private Animator animateur;
    private Transform Enemies;
    public float speed = 2f;
    private float minDistance = 0.2f;
    private float distance = 2;
    private float range;
    Rigidbody2D body;
    public bool attack = false;
    public double health;
    public AudioClip jinbeyArrive;
    public AudioClip Karate;

    // Use this for initialization
    void Start()
    {
        animateur = this.GetComponent<Animator>();
        body = this.GetComponent<Rigidbody2D>();
        health = 0.5;
    }

    void Update()
    {
        Enemies = GameObject.FindWithTag("Enemies").transform;
        range = Vector2.Distance(transform.position, Enemies.position);
        if (range > minDistance)
        {
            transform.position = Vector2.MoveTowards(transform.position, Enemies.position, speed * Time.deltaTime);
        }
        if (range < distance)
        {
            animateur.SetTrigger("Karate");
            attack = true;
        }
        else
        {
            attack = false;
        }

        if (Enemies.position.x > transform.position.x)
        {
            //face right
            transform.localScale = new Vector3(-2, 2, 1);
        }
        else if (Enemies.position.x < transform.position.x)
        {
            //face left
            transform.localScale = new Vector3(2, 2, 1);
        }
        if(health <= 0)
        {
            Destroy(gameObject);
        }
    }
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == "Enemies" && attack == true)
        {
            if (!this.GetComponent<AudioSource>().isPlaying)
            {
                this.GetComponent<AudioSource>().PlayOneShot(Karate);
            }
            //other.GetComponent<Animator>().SetTrigger("Ragdol");
            GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Eveil = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Eveil + 0.1;
            GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().SetNewValue(GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Eveil);
            GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().ForceUpdate();
            Destroy(other.gameObject);              //destroys other collider's gameobject
            GameObject.FindGameObjectWithTag("Player").GetComponent<PointCounter>().score++;
        }
    }

    private void FixedUpdate()
    {
    }
}
