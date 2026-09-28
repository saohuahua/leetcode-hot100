export function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const successors = Array.from({ length: numCourses }, () => [] as number[])
  const remaining = Array<number>(numCourses).fill(0)
  for (const [course, prerequisite] of prerequisites) {
    successors[prerequisite].push(course)
    remaining[course]++
  }
  const queue: number[] = []
  for (let course = 0; course < numCourses; course++) {
    if (remaining[course] === 0) queue.push(course)
  }
  let head = 0
  let completed = 0
  while (head < queue.length) {
    const course = queue[head++]
    completed++
    for (const next of successors[course]) {
      // 只有最后一个先修完成时才解锁后继课程
      remaining[next]--
      if (remaining[next] === 0) queue.push(next)
    }
  }
  return completed === numCourses
}
