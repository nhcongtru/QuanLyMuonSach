<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ book.name }}
        </div>
        <div class="p-1">
            <strong>Giá mượn:</strong>
            {{ book.price }}
        </div>
        <div class="p-1">
            <strong>Số lượng còn lại:</strong>
            {{ book.quality }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong>
            {{ book.year }}
        </div>
        <div class="p-1">
            <strong>Nguồn gốc/Tác giả:</strong>
            {{ book.NguonGocOrTacGia }}
        </div>
    </div>
</template>