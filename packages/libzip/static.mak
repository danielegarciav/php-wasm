#!/usr/bin/env make

ifeq (${WITH_LIBZIP}, 1)

LIBZIP_TAG?=v1.10.1

ARCHIVES+= lib/lib/libzip.a
CONFIGURE_FLAGS+= --with-zip

third_party/libzip/.gitignore:
	@ echo -e "\e[33;4mDownloading LibZip\e[0m"
	${DOCKER_RUN} git clone https://github.com/nih-at/libzip.git third_party/libzip \
		--branch ${LIBZIP_TAG} \
		--single-branch     \
		--depth 1;

lib/lib/libzip.a: third_party/libzip/.gitignore
	@ echo -e "\e[33;4mBuilding LibZip\e[0m"
	${DOCKER_RUN_IN_LIBZIP} emcmake cmake . \
		-DCMAKE_INSTALL_PREFIX=/src/lib/ \
		-DCMAKE_BUILD_TYPE=Release \
		-DCMAKE_C_FLAGS="-I/emsdk/upstream/emscripten/system/lib/libc/musl/include/ -fPIC"
	${DOCKER_RUN_IN_LIBZIP} emmake make -j1;
	${DOCKER_RUN_IN_LIBZIP} emmake make install;

endif

