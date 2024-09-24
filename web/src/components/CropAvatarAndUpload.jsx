import axios from 'axios';
import { getToken } from '@/utils/auth'
import { Col, Modal, notification, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import { CircleStencil, Cropper, CropperPreview } from "react-advanced-cropper";
import 'react-advanced-cropper/dist/style.css';
import { getRandomNumber } from '../utils';
import { modifyAvatar } from '../api/user';
import { getInfo } from '../api/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/globalSlice';

const CropAvatarAndUpload = (props) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [src, setSrc] = useState(null);

    const dispatch = useDispatch();

    const cropperRef = useRef(null);
    const previewRef = useRef(null);

    useEffect(() => {
        if (src !== null) {
            setOpen(true);
        }
    }, [src]);

    const chooseImage = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/jpeg, image/png, image/jpg, image/webp';
        fileInput.onchange = handleImageChange;
        fileInput.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file.type.includes('image/jpeg') && !file.type.includes('image/png') && !file.type.includes('image/jpg') && !file.type.includes('image/webp')) {
            notification.warning({
                message: '提示',
                description: '图片格式不支持，(请上传jpeg、png、jpg、webp格式的图片)',
                duration: 5
            });
            return;
        }
        setSrc(URL.createObjectURL(file));
    };

    const onChange = (cropper) => {
        console.log(cropper.getCoordinates(), cropper.getCanvas());
    };

    const onUpdate = (cropper) => {
        previewRef.current?.update(cropper);
    };

    const ok = () => {
        setConfirmLoading(true);
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            console.log('canvas', canvas);
            const form = new FormData();
            canvas.toBlob((blob) => {
                if (blob) {
                    console.log('blob', blob);
                    form.append('file', blob, 'file' + new Date().getTime() + getRandomNumber(1000, 9999) + '.jpeg');
                    // 上传图片
                    axios.post('/api/upload', form, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': getToken()
                        },
                    }).then(res => {
                        console.log('upload-res', res);
                        if (res.data.code !== '200') {
                            notification.error({
                                message: '提示',
                                description: '图片上传失败',
                                duration: 5
                            });
                            return;
                        }
                        // 上传接口返回新图片地址
                        let avatarUrl = res.data.result.replace(/^"(.*)"$/, '$1');
                        // 修改头像
                        modifyAvatar(avatarUrl).then(res => {
                            console.log('modifyAvatar-res', res);
                            // 获取用户信息
                            getInfo().then(res => {
                                console.log('getInfo-res', res);
                                dispatch(setUser(res.result));
                                notification.success({
                                    message: '提示',
                                    description: '图片上传成功',
                                    duration: 5
                                });
                                setOpen(false);
                                setConfirmLoading(false);
                                setSrc(null);
                            })
                        });
                    }).catch(err => {
                        console.log('upload-err', err);
                        notification.error({
                            message: '提示',
                            description: '图片上传失败',
                            duration: 5
                        });
                        setOpen(false);
                        setSrc(null);
                    });
                }
            }, 'image/jpeg');
        }
    };

    return (
        <>
            <div onClick={chooseImage}>{props.children}</div>
            <Modal
                title='图片裁剪'
                width='50%'
                destroyOnClose
                open={open}
                keyboard={false}
                maskClosable={false}
                onOk={ok}
                confirmLoading={confirmLoading}
                onCancel={() => { setOpen(false); setSrc(null); }}
            >
                <Row gutter={20}>
                    <Col span={18}>
                        <Cropper
                            ref={cropperRef}
                            src={src}
                            stencilProps={{ aspectRatio: 1 / 1, grid: true }}
                            stencilComponent={CircleStencil}
                            onChange={onChange}
                            onUpdate={onUpdate}
                            className="cropper"
                            style={{ maxHeight: '50vh', maxWidth: '40vw' }}
                        />
                    </Col>
                    <Col span={6}>
                        <div style={{ fontWeight: '700', marginBottom: '10px' }}>预览</div>
                        <div style={{ overflow: 'hidden', borderRadius: '50%', border: '1px solid #00e1ff' }}>
                            <CropperPreview
                                ref={previewRef}
                                className="preview"
                            />
                        </div>
                    </Col>
                </Row>
            </Modal>
        </>
    );
};

export default CropAvatarAndUpload;