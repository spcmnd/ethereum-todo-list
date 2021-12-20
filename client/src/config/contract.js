export async function getTodoListContract() {
  const todoListContract = await fetch("/TodoList.json");
  const TODOLIST_ABI = todoListContract.abi;

  return TODOLIST_ABI;
}
