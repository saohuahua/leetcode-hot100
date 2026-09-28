export function dailyTemperatures(temperatures: number[]): number[] {
  const answer = Array<number>(temperatures.length).fill(0)
  const waiting: number[] = []
  for (let day = 0; day < temperatures.length; day++) {
    // 栈中只保留尚未等到严格更高温度的日期
    while (waiting.length > 0 && temperatures[day] > temperatures[waiting[waiting.length - 1]]) {
      const previous = waiting.pop()!
      answer[previous] = day - previous
    }
    waiting.push(day)
  }
  return answer
}
