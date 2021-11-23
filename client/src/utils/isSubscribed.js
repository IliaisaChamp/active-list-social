export const isSubscribed = (subscribesArr, userId) => {
  for (const subscribtion of subscribesArr) {
    if (subscribtion.id === userId) {
      return true;
    }
  }
  return false;
};
