---
layout: portfolio_entry
title: Facial Feature Detection & Filter
image: /img/Pacman/tiny_maze.gif
---
![](/img/Pacman/tiny_maze.gif)

**I used a variety of data structures and algorithms to help Pacman navigate through several types of mazes!**

*Keywords*: Python, depth first search, breadth first search, A* search, heuristics, suboptimal search, stack, queue, priority queue

The problem is based off of UC Berkeley CS188 [project](http://ai.berkeley.edu/search.html).  The below results receive **100%** on the autograder code provided with the project.  The instructors request that no solutions are distributed or posted anywhere.  Therefore, there will be no full codes available in this post, but I will be happy to talk through them if you are interested.

![](/img/Pacman/maze.png)
## Single goal search
This problem is the easiest problem we will tackle.  The problem is this: Pacman is in a maze with a single food goal as shown above.  This is relatively a simple network search problem, where each open positions (i.e. not a wall) is a node and adjacent nodes are bidirectionally connected (all weight of 1).  You're trying to go from node A (Pacman's starting position) to node B (where the food is).
There are several methods to solve this: depth-first search (**DFS**), breadth-first search (**BFS**), uniform-cost search (**UCS**), and A* search (<b>A&ast;</b>).

Basic algorithm is the same (sorry it's super vague, no solutions...):
```
pop the first/top state from the list of states to be explored
if goal
    >>> return the path to state
elif state has not been expanded
    >>> expand the state (look at its connected nodes)
    >>> add new states to the list
repeat
```  
The only difference is how the list (of states to be explored) is managed---stack, queue, priority queue, or priority queue with a heuristic function (not giving anything away, since this is written out in the instructions).  
You can look at the project [instructions](http://ai.berkeley.edu/search.html) or [lecture slides](http://ai.berkeley.edu/lecture_slides.html) for more details.

Below is the difference between DFS & BFS algorithm in a medium maze:  
![DFS](/img/Pacman/medium_maze_dfs.gif "DFS finds a solution fast, but it's often not optimal")
![BFS](/img/Pacman/medium_maze_bfs.gif "BFS will always find an optimal solution, but searches a lot")  
The red color represents positions that were explored.  BFS looks like the winner, but we have the note that as the maze grows, time complexity for BFS will grow exponentially.

[Skip to pretty GIFs](#final-results-single-goal-)

In our case where each step is a constant cost of 1, UCS will give same result as BFS.  However, we can add on UCS a *heuristic function* (becoming A*), which tries to estimate the cost to the goal, to reduce the number of states to explore.

In simple terms, a heuristic function tries to estimate the optimum cost to go from the current position to the goal position (the definition has to evolve a little for many food scenario, but we'll stick to this for now).  
Why?  Each step that Pacman has cost of 1.  However, if the resulting position is a step closer to the goal, then that's that's what we want!  If the resulting position is a step farther to the goal, then that's not what we want!  So by adding the heuristic function (which estimates total cost towards the goal) to our cumulative cost, the increase in cumulative cost caused by a step towards the goal is canceled by the decrease in the heuristic estimate.  So the heuristic function helps us to explore states that takes us closer to the goal.

It's actually hard to calculate the actual cost to the goal... Also, if we can calculate that easily, we wouldn't be doing this whole silliness.  Most common way that experts achieve a good heuristic functions is *rule relaxation*.

For example, most common idea is to relax the movement constraints.  So you can estimate the cost to get to the goal by [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance 'Hypotenuse!') between our Pacman and the goal position.  So this will encourage our algorithm to explore more towards the goal position (in Euclidean sense).  
Usually, the more relaxed it is, less accurate the cost function is; therefore, it would be less helpful.  In other words, the closer the heuristic estimates the real cost to the goal, more helpful it is.  (Caution: it cannot be higher! Or it may not find the optimal solution)  
From  the above example, you can make it more strict (or less relaxed) by calculating the [Manhattan distance](https://en.wiktionary.org/wiki/Manhattan_distance).  This is a very common technique.

At this point, heuristic functions can be very simple.  

#### Final Results (single goal)
| Algorithm | Total path cost | Node expansions |
| :---: | :---: | :---: |
| DFS | 49 | 59 |
| BFS | 19 | 92 |
| UCS | 19 | 92 |
| A* (Euclidean) | 19 | 56 |
| A* (Manhattan) | 19 | 53 |

![AStar](/img/Pacman/medium_maze_astar.gif "AStar searches less AND finds an optimal solution")  

## Multi-goal search
Now we get to the more interesting problem.  This is where A* really shines.  So what do we do when there's multiple goals?  Calculating a heuristic estimate to a single point is not that useful any more.  Now we're trying to estimate the optimum path that makes Pacman eat ALL the food in the maze.  This is a very, very [hard](https://en.wikipedia.org/wiki/Travelling_salesman_problem 'NP-hard') problem to solve.  
(I'll skip the discussion on how the goal tracking also needs to be changed.  There are many ways to do this using classes or tuples.)

Below are some heuristic ideas I tried.  I will leave the implementation (including treatments of edge cases) & their performance for you to figure out.  Some of them may not be [admissible or consistent](http://ai.berkeley.edu/search.html#Q6).
- Sum of distances (Euclidean or Manhattan) to all remaining goals
- Average distance to all remaining goals
- Average distance to *n* closest remaining goals
- Distance to closest remaining goal
- Minimum connected path length to all remaining goals

Here's the result from one of them:  
![Tricky Search](/img/Pacman/tricky_search_astar.gif "Nom nom nom.")  
Total path cost: 60  
Node expansions: 8396  
Time to search: 87.4 s

Important number here is 8396! This reduces the node explored to about half compared to UCS (no heuristic).  
Okay, that took some time, though.  Typically, the more complex the heuristic function (and accurate), less node expansions at the sacrifice of search time.

Here's the problem then... The above problem didn't look super complex.  What if the problem gets much more complex?  It would take too long to search!  
Sometimes, we have to live with suboptimal solutions.  Below is an implementation of **Greedy algorithm** on a much more complex maze.

![Greedy search](/img/Pacman/big_search_greedy.gif "She's 10x faster here. Look at her go!")
