using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour
{
    public float vitesseMax = 10f;
    public float JumpForce = 700.0f;
    GameObject Player;
    public GameObject allies;
    private bool versDroite = true;
    private Animator animateur;
    Rigidbody2D body;
    public bool alive;

    bool Grounded = false;
    public Transform GroundCheck;
    float GroundRadius = 0.2f;
    public LayerMask WhatIsGround;
    
    public double Health;
    public double Eveil;

    public AudioClip jumpSound;

    bool doubleJump = false;
    public AudioClip gatlinSound;
    public AudioClip gomuSound;
    public AudioClip foodSound;
    public AudioClip gear4Sound;
    public AudioClip bazookaSound;
    public AudioClip airgatlingSound;
    public AudioClip pistolSound;

    public bool attack = false;
    public bool takeDamage = false;
    public AudioClip impactSoundDoflamingo;

    // Use this for initialization
    void Start()
    {
        body = this.GetComponent<Rigidbody2D>();
        animateur = this.GetComponent<Animator>();
        alive = true;
        Health = 1;
        Eveil = 0;
        //GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().SetNewValue(0);
        GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().ForceUpdate();
        GameObject.Find("LifeText").GetComponent<Text>().text = (GameObject.Find("Life").GetComponent<LifeKeeper>().life).ToString(); ;
    }
    private void FixedUpdate()
    {
        Grounded = Physics2D.OverlapCircle(GroundCheck.position, GroundRadius, WhatIsGround);
        animateur.SetBool("Ground", Grounded);
        animateur.SetFloat("vSpeed", body.velocity.y);

        if (Grounded)
            doubleJump = false;

        float move = Input.GetAxis("Horizontal");
        body.velocity = new Vector2(move * vitesseMax, body.velocity.y);

        if (move > 0 && !versDroite)
        {
            flip();
        }
        else if (move < 0 && versDroite)
        {
            flip();
        }
        animateur.SetFloat("Speed", Mathf.Abs(move * vitesseMax));
    }
    private void flip()
    {
        versDroite = !versDroite;
        Vector3 theScale = transform.localScale;
        theScale.x *= -1;
        transform.localScale = theScale;
    }
    // Update is called once per frame
    void Update()
    {
        Vector2 SpriteSize = gameObject.GetComponent<SpriteRenderer>().sprite.bounds.size;
        if (Eveil > 1) Eveil = 1;

        if ((Grounded || !doubleJump) && Input.GetKeyDown("space"))
        {
            attack = false;
            takeDamage = true;
            animateur.SetBool("Ground", false);
            body.AddForce(new Vector2(0, JumpForce));

            if (!this.GetComponent<AudioSource>().isPlaying)
                this.GetComponent<AudioSource>().PlayOneShot(jumpSound);

            if (!doubleJump && !Grounded)
                doubleJump = true;
        }

        if (Grounded && Input.GetKeyDown("b"))
        {
            attack = true;
            takeDamage = false;
            if (!this.GetComponent<AudioSource>().isPlaying)
            {
                this.GetComponent<AudioSource>().PlayOneShot(gatlinSound);
            }
            animateur.SetTrigger("Gatling");
            this.GetComponent<BoxCollider2D>().size = SpriteSize;
        }
        if (Grounded && Input.GetKeyDown("n"))
        {
            attack = true;
            takeDamage = false;
            if (!this.GetComponent<AudioSource>().isPlaying)
            {
                this.GetComponent<AudioSource>().PlayOneShot(bazookaSound);
            }
            animateur.SetTrigger("Bazooka");
            this.GetComponent<BoxCollider2D>().size = SpriteSize;
        }
        if (Grounded && Input.GetKeyDown("k"))
        {
            attack = true;
            takeDamage = false;
            if (!this.GetComponent<AudioSource>().isPlaying)
            {
                this.GetComponent<AudioSource>().PlayOneShot(pistolSound);
            }

            animateur.SetTrigger("Pistol");
            this.GetComponent<BoxCollider2D>().size = SpriteSize;
        }
        /*if (Grounded && Input.GetKeyDown("j"))
        {
            attack = true;
            takeDamage = false;
            if (!this.GetComponent<AudioSource>().isPlaying)
            {
                this.GetComponent<AudioSource>().PlayOneShot(stampSound);
            }
            animateur.SetTrigger("Stamp");
            this.GetComponent<BoxCollider2D>().size = SpriteSize;
        }*/

        if (Grounded && Input.GetKeyDown("y") && Eveil >= 1)
        {
            Eveil = 0;
            GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().SetNewValue(Eveil);
            GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().ForceUpdate();
            Instantiate(allies, transform.position, transform.rotation);
            if (!GameObject.FindGameObjectWithTag("Allies").GetComponent<AudioSource>().isPlaying)
            {
                GameObject.FindGameObjectWithTag("Allies").GetComponent<AudioSource>().PlayOneShot(GameObject.FindGameObjectWithTag("Allies").GetComponent<JinbeyController>().jinbeyArrive);
            }
            /*
            if (!this.GetComponent<AudioSource>().isPlaying)
            {
                this.GetComponent<AudioSource>().PlayOneShot(gear4Sound);
            }
            animateur.SetTrigger("Gear4");
            GameObject.FindGameObjectWithTag("Bounce").GetComponent<AudioSource>().Play();
            this.GetComponent<BoxCollider2D>().size = SpriteSize;*/
        }
        if(animateur.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).IsName("Idle") || animateur.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).IsName("Run") || animateur.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).IsName("Walk") || animateur.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).IsName("Jump"))
        {
            attack = false;
            takeDamage = true;
            this.GetComponent<BoxCollider2D>().size = SpriteSize;
        }
    }
    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.tag == "Food")
        {
            if (!this.GetComponent<AudioSource>().isPlaying)
            {
                this.GetComponent<AudioSource>().PlayOneShot(foodSound);
            }
            if (Health > 1) Health = 1;
            else Health = Health + 0.2;
            GameObject.FindGameObjectWithTag("Health").GetComponent<GUIBarScript>().SetNewValue(Health);
            GameObject.FindGameObjectWithTag("Health").GetComponent<GUIBarScript>().ForceUpdate();
            Destroy(other.gameObject);
        }
        //checks other collider's tag
        if (other.gameObject.tag == "Enemies" && attack == true)
        {
            //other.GetComponent<Animator>().SetTrigger("Ragdol");
            GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Eveil = GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Eveil + 0.1;
            GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().SetNewValue(GameObject.FindGameObjectWithTag("Player").GetComponent<PlayerController>().Eveil);
            GameObject.FindGameObjectWithTag("Eveil").GetComponent<GUIBarScript>().ForceUpdate();
            Destroy(other.gameObject);              //destroys other collider's gameobject
            GameObject.FindGameObjectWithTag("Player").GetComponent<PointCounter>().score++;
        }
        /*if (other.gameObject.tag == "Enemies")
        {
            // how much the character should be knocked back
            int magnitude = 50;
            // calculate force vector
            Vector3 force = transform.position - other.transform.position;
            // normalize force vector to get direction only and trim magnitude
            force.Normalize();
            GameObject.FindGameObjectWithTag("Enemies").GetComponent<Rigidbody2D>().AddForce(-force * magnitude);
        }*/
    }
}
