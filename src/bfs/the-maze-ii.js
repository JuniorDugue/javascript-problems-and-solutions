/**
 * The Maze II
 *
 * There is a ball in a maze with empty spaces and walls.
 * The ball can go through empty spaces by rolling up, down, left or right,
 * but it won't stop rolling until hitting a wall. When the ball stops, it could choose the next direction.
 *
 * Given the ball's start position, the destination and the maze,
 * find the shortest distance for the ball to stop at the destination.
 * The distance is defined by the number of empty spaces traveled by the ball
 * from the start position (excluded) to the destination (included). If the ball
 * cannot stop at the destination, return -1.
 *
 * The maze is represented by a binary 2D array. 1 means the wall and 0 means the empty space.
 * You may assume that the borders of the maze are all walls.
 * The start and destination coordinates are represented by row and column indexes.
 *
 * Example 1
 *
 * Input 1: a maze represented by a 2D array
 *
 * 0 0 1 0 0
 * 0 0 0 0 0
 * 0 0 0 1 0
 * 1 1 0 1 1
 * 0 0 0 0 0
 *
 * Input 2: start coordinate (rowStart, colStart) = (0, 4)
 * Input 3: destination coordinate (rowDest, colDest) = (4, 4)
 *
 * Output: 12
 * Explanation: One shortest way is : left -> down -> left -> down -> right -> down -> right.
 *              The total distance is 1 + 1 + 3 + 1 + 2 + 2 + 2 = 12.
 *
 * Example 2
 *
 * Input 1: a maze represented by a 2D array
 *
 * 0 0 1 0 0
 * 0 0 0 0 0
 * 0 0 0 1 0
 * 1 1 0 1 1
 * 0 0 0 0 0
 *
 * Input 2: start coordinate (rowStart, colStart) = (0, 4)
 * Input 3: destination coordinate (rowDest, colDest) = (3, 2)
 *
 * Output: -1
 * Explanation: There is no way for the ball to stop at the destination.
 *
 * Note:
 *
 * 1. There is only one ball and one destination in the maze.
 * 2. Both the ball and the destination exist on an empty space,
 *    and they will not be at the same position initially.
 * 3. The given maze does not contain border (like the red rectangle in the example pictures),
 *    but you could assume the border of the maze are all walls.
 * 4. The maze contains at least 2 empty spaces, and both the width and height of the maze won't exceed 100.
 */

/**
 * BFS Solution
 *
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
const shortestDistance = (maze, start, destination) => {
  const m = maze.length;
  const n = maze[0].length;
  const queue = [start];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  const distance = Array(m)
    .fill()
    .map(() => Array(n).fill(Number.MAX_SAFE_INTEGER));

  distance[start[0]][start[1]] = 0;

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    for (let [dx, dy] of dirs) {
      let i = x + dx;
      let j = y + dy;
      let count = 0;

      // Keep rolling in the current direction
      while (i >= 0 && i < m && j >= 0 && j < n && maze[i][j] === 0) {
        count++;
        i += dx;
        j += dy;
      }

      // One step back
      i -= dx;
      j -= dy;

      if (distance[i][j] > distance[x][y] + count) {
        distance[i][j] = distance[x][y] + count;
        // Continue rolling(or search) from [i, j]
        queue.push([i, j]);
      }
    }
  }

  return distance[destination[0]][destination[1]] === Number.MAX_SAFE_INTEGER
    ? -1
    : distance[destination[0]][destination[1]];
};

export { shortestDistance };
