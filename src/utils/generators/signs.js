export const signGenerator = signArray => {
  return signArray[Phaser.Math.Between(0, signArray.length - 1)];
};
