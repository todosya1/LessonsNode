// чтобы запустить пропиши в терминале node Task#2.js


// написать код, который находит все простые числа, меньшие 237.
function isPrime(num) {
    if (num < 2) return false; // Простое число больше 1
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false; // Если делится без остатка, не простое
      }
    }
    return true;
  }
  
  const limit = 237; // Ограничение
  const primes = [];
  
  for (let i = 2; i < limit; i++) {
    if (isPrime(i)) {
      primes.push(i); // Добавляем простое число в массив
    }
  }
  
  console.log(primes); // Вывод всех простых чисел
  