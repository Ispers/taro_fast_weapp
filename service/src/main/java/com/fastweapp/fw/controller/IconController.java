package com.fastweapp.fw.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.domain.Icon;
import com.fastweapp.fw.domain.dto.IconDto;
import com.fastweapp.fw.service.IconService;
import com.fastweapp.fw.utils.PageResult;
import com.fastweapp.fw.utils.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/api/icon")
@RequiredArgsConstructor
public class IconController {
    private final IconService iconService;

    @GetMapping("/getIcon")
    @Log(module = "图标", events = "获取图标")
    public ResultResponse<PageResult<Icon>> getIcon(Page<Icon> page, IconDto dto) {
        PageResult<Icon> res = iconService.getIcon(page, dto);
        return ResultResponse.success("图标查询成功", res);
    }

    @PostMapping("/addIcon")
    @Log(module = "图标", events = "新增图标")
    public ResultResponse<String> addIcon(@RequestBody Icon icon) {
        iconService.addIcon(icon);
        return ResultResponse.success("新增图标成功");
    }

    @PostMapping("/modifyIcon")
    @Log(module = "图标", events = "修改图标")
    public ResultResponse<String> modifyIcon(@RequestBody Icon icon) {
        iconService.modifyIcon(icon);
        return ResultResponse.success("修改图标成功");
    }

    @PostMapping("/removeIcon")
    @Log(module = "图标", events = "删除图标")
    public ResultResponse<String> removeIcon(@RequestBody Set<Integer> ids) {
        iconService.removeIcon(ids);
        return ResultResponse.success("删除图标成功");
    }
}
