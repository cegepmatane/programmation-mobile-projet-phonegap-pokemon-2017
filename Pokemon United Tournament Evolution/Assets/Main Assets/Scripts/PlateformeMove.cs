using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlateformeMove : MonoBehaviour {

    public float speed = 0.5f, reductionFactor = 1;
    public bool moveOnTouch = false;

    Transform toPoint, playerParent;
    Vector3 fromPos, toPos;
    bool forward = true, touch = false;
    float distFrom, distTo, moveSpeed, lowSpeedDist;

    void Awake()
    {
        toPoint = transform.Find("toPoint");
        fromPos = transform.position;
        toPos = toPoint.transform.position;
        lowSpeedDist = Mathf.Abs(fromPos.x - toPos.x) * 0.15f;
        toPoint.parent = null;
    }

    void FixedUpdate()
    {
        if (!moveOnTouch)
        {
            Move();
        }
        else if (touch)
        {
            Move();
        }
    }

    void Move()
    {
        distFrom = Mathf.Abs(transform.position.x - fromPos.x);
        distTo = Mathf.Abs(transform.position.x - toPos.x);
        reductionFactor = (reductionFactor > 0 ? reductionFactor : 1);
        moveSpeed = (distFrom < lowSpeedDist || distTo < lowSpeedDist ? speed / reductionFactor : speed);

        transform.position = Vector3.MoveTowards(transform.position,
            (checkPos() ? toPos : fromPos),
            moveSpeed * Time.deltaTime);
    }

    bool checkPos()
    {
        bool result = true;

        if (forward && transform.position.x != toPos.x)
        {
            result = true;
        }
        else
        {
            forward = false;
        }

        if (!forward && transform.position.x != fromPos.x)
        {
            result = false;
        }
        else
        {
            forward = true;
        }

        return result;
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            touch = true;
            playerParent = other.transform.parent;
            other.transform.parent = transform;
        }
    }

    void OnTriggerExit2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            touch = false;
            other.transform.parent = playerParent;
        }
    }
}