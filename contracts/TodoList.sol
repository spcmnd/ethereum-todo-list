// SPDX-License-Identifier: GPL-v3.0
pragma solidity >0.5.1 <0.9.0;
pragma experimental ABIEncoderV2;

contract TodoList {
    // Task
    struct Task {
        string content;
        bool completed;
    }

    event TaskCreated(string content, address sender);
    event TaskCompleted(address sender);
    event TaskDeleted(address sender);

    mapping(address => Task[]) private users;

    function createTask(string calldata _content) external {
        Task memory task = Task(_content, false);
        users[msg.sender].push(task);
        emit TaskCreated(task.content, msg.sender);
    }

    function getTask(uint256 _index) external view returns (Task memory) {
        Task storage task = users[msg.sender][_index];

        return task;
    }

    function getTasksCount() external view returns (uint256) {
        if (users[msg.sender].length == 0) {
            return 0;
        }

        uint256 taskCount = users[msg.sender].length;

        return taskCount;
    }

    function completeTask(uint256 _index) external {
        Task storage task = users[msg.sender][_index];
        task.completed = true;
        emit TaskCompleted(msg.sender);
    }

    function deleteTask(uint256 _index) external {
        require(_index < users[msg.sender].length);
        users[msg.sender][_index] = users[msg.sender][
            users[msg.sender].length - 1
        ];
        users[msg.sender].pop();
        emit TaskDeleted(msg.sender);
    }
}
