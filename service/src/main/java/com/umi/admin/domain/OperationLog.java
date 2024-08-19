package com.umi.admin.domain;

import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 系统日志实体类
 */
@Data
public class OperationLog implements Serializable, Cloneable {
    private static final long serialVersionUID = 1L;

    /**
     * 实现 Cloneable 克隆拷贝
     * 创建一个 默认 对象，用于作为克隆的源数据
     */
    private static final OperationLog log = new OperationLog();

    /**
     * 获取克隆对象, 避免new的方式创建
     *
     * @return {@link OperationLog}
     */
    public static OperationLog getInstance() {
        try {
            return log.clone();
        } catch (CloneNotSupportedException e) {
            return new OperationLog();
        }
    }

    /**
     * 重写克隆方法
     *
     * @return {@link OperationLog}
     */
    public OperationLog clone() throws CloneNotSupportedException {
        return (OperationLog) super.clone();
    }

    /**
     * 私有化构造函数，不允许 new
     */
    private OperationLog() {
        this.deleted = false;
    }

    // 主键ID
    private Long id;
    // 操作人ID
    private Long operationUserId;
    // 操作人用户名
    private String operationUsername;
    // 操作人昵称
    private String operationNickname;
    // 操作模块
    private String operationModule;
    // 具体操作事件
    private String operationEvents;
    // 操作url
    private String operationUrl;
    // 操作附带数据
    private String operationData;
    // 操作是否正常，1正常操作， 0 操作异常
    private Boolean operationStatus;
    // 操作结果
    private String operationResult;
    // 操作所在IP
    private String operationIp;
    // 操作时间
    private LocalDateTime addTime;
    // 1 删除，0 未删除
    private Boolean deleted;
}
