using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour {

    public float move;
    public float maxSpeed = 10f;
    public bool lookRight = true;
    private Animator brazegalimator;
    Rigidbody2D body;

    // Use this for initialization
    void Start () {
        brazegalimator = this.GetComponent<Animator>();
        body = this.GetComponent<Rigidbody2D>();
    }

    private void FixedUpdate()
    {
        body.velocity = new Vector2(move * maxSpeed, body.velocity.y);
        move = Input.GetAxis("Horizontal");
        brazegalimator.SetFloat("Speed", Mathf.Abs(move));

        if (move < 0 && !lookRight)
            Flip();

        else if (move > 0 && lookRight)
            Flip();
    }
    // Update is called once per frame
    void Update () {
		
	}

    private void Flip()
    {
        lookRight = !lookRight;
        Vector3 theScale = transform.localScale;
        theScale.x *= -1;
        transform.localScale = theScale;
    }
}
