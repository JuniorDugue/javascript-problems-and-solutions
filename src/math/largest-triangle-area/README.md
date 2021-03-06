# Largest Triangle Area

You have a list of points in the plane.
Return the area of the largest triangle that can be formed by any 3 of the points.

Example:
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2
Explanation:
The five points are show in the figure below. The red triangle is the largest.

<!-- markdownlint-disable MD033 -->
<img alt="largest-triangle-area" src="https://user-images.githubusercontent.com/565300/42524905-af6f4e1c-8426-11e8-90e5-f2b3ad77e8f5.png" width="350" />

Notes:

- 3 <= points.length <= 50.
- No points will be duplicated.
- -50 <= points[i][j] <= 50.
- Answers within 10^-6 of the true value will be accepted as correct.

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
const largestTriangleArea = points => {
  const n = points.length;

  let res = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        res = Math.max(res, getArea(points[i], points[j], points[k]));
      }
    }
  }

  return res;
};

const getArea = (P, Q, R) =>
  0.5 * Math.abs(P[0] * Q[1] + Q[0] * R[1] + R[0] * P[1] - P[1] * Q[0] - Q[1] * R[0] - R[1] * P[0]);
```
