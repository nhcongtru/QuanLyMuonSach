<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark container">
        <a href="/" class="navbar-brand">Ứng dụng Quản lý Mượn Sách</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'bookview' }" class="nav-link">
                    Sách
                    <i class="fas fa-book"></i>
                </router-link>
            </li>
        </div>
    </nav>
</template>