const generateGoal = (digits?: number) => {
  digits ??= 4; // default value if digits is null(or undefined)

  // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]를 만드는 방법:
  // 문자열로 받아도 될 때: Object.keys([...new Array(10)])
  // 숫자로 받고 싶을 때: [...new Array(10)].map(({ _, index }) => index)
  const numArray = [...new Array(10)].map(({ _, index }) => index);

  // (ex) 4자리인 경우 -> 4 차례만 스왑(SWAP)하면서 확률은 공정하게 유지함(이미 선정된 것을 제외하면 됨).
  for (let i = 0; i < digits; i++) {
    // 처음: 10개 중 하나(1/10)
    // 두 번째: 뒤에서부터 9개 중 하나(9/10 * 1/9 = 1/10)
    // 세 번째: 뒤에서부터 8개 중 하나(9/10 * 8/9 * 1/8 = 1/10)
    // 네 번째: 뒤에서부터 7개 중 하나(9/10 * 8/9 * 7/8 * 1/7 = 1/10)
    const targetIndex = 9 - Math.floor(Math.random() * (10 - i));
    if (targetIndex === i) continue;

    // XOR Swap은 메모리를 덜 쓰지만, swap용 임시 변수(temp)를 사용하는 방식에 비해 연산량을 더 차지한다.
    numArray[i] ^= numArray[targetIndex];
    numArray[targetIndex] ^= numArray[i];
    numArray[i] ^= numArray[targetIndex];
  }

  return numArray.slice(0, digits);
};

export default generateGoal;
