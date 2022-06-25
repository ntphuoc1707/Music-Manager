package com.exercise.musicmanager.models;

public class Result {
    private Boolean status;
    private Object data;
    private String message;

    public Result() {
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getStatus() {
        return status;
    }

    public Object getData() {
        return data;
    }

    public String getMessage() {
        return message;
    }

    public Result(Boolean status, Object data, String message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
}
