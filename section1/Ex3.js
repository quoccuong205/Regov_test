var maxProduct = function(nums) {
  let maxProduct = nums[0]; // result max product
  let max = nums[0]; // current max product possible
  let min = nums[0]; // current min product possible
  for (let i = 1; i < nums.length; i++) {
      let tmp = nums[i] * max; // keep current product
      max = Math.max(tmp, nums[i] * min, nums[i]);  // choose max possible variant
      min = Math.min(tmp, nums[i] * min, nums[i]);  // choose min possible variant
      maxProduct = Math.max(maxProduct, max);  // find out max result by now
  }
  return maxProduct;
};
const arr1 = [2, 3, -2, 4];
const arr2 = [-2, 0, -1];

console.log(maxProduct(arr2));
