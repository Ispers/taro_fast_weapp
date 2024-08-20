package com.fastweapp.fw.annotation;

import com.fastweapp.fw.common.OrderType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Order {
    OrderType value() default OrderType.ASC;
}
