export async function handleCategory(setIsLoading, state, setCategoryList) {
  try {
    setIsLoading(true);
    //將種類回傳成陣列
    let unsort = state?.productAll?.map((item) => {
      return item.category;
    });
    //篩選出不重複的種類
    let sorted = unsort.filter((item, i) => {
      return unsort.indexOf(item) === i;
    });
    setCategoryList(sorted);
    setIsLoading(false);
  } catch (error) {
    console.log(error);
  }
}
