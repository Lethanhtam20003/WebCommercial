/**
 * Cấu trúc thư mục chuẩn cho dự án Angular
 */

export const FOLDER_STRUCTURE = {
  // Thư mục gốc của ứng dụng
  APP: {
    CORE: {
      GUARDS: 'guards',        // Route guards
      INTERCEPTORS: 'interceptors', // HTTP interceptors
      SERVICES: 'services',    // Core services
      MODELS: 'models',        // Interfaces, Types, Enums
      CONSTANTS: 'constants'   // Constants, Configurations
    },

    SHARED: {
      COMPONENTS: 'components', // Shared components
      DIRECTIVES: 'directives', // Shared directives
      PIPES: 'pipes',          // Shared pipes
      UTILS: 'utils'           // Utility functions
    },

    FEATURES: {
      // Cấu trúc cho mỗi feature module
      MODULE_STRUCTURE: {
        COMPONENTS: 'components',
        SERVICES: 'services',
        MODELS: 'models',
        PAGES: 'pages'
      }
    },

    LAYOUTS: 'layouts',        // Application layouts
    PAGES: 'pages'            // Main pages
  },

  // Thư mục tài nguyên
  ASSETS: {
    IMAGES: 'images',
    ICONS: 'icons',
    STYLES: 'styles',
    FONTS: 'fonts'
  },

  // Thư mục môi trường
  ENVIRONMENTS: 'environments'
};

/**
 * Quy tắc đặt tên file
 */
export const FILE_NAMING_CONVENTION = {
  COMPONENTS: {
    TEMPLATE: '[name].component.ts',
    STYLE: '[name].component.scss',
    HTML: '[name].component.html',
    TEST: '[name].component.spec.ts'
  },
  
  SERVICES: {
    TEMPLATE: '[name].service.ts',
    TEST: '[name].service.spec.ts'
  },

  MODELS: {
    INTERFACE: '[name].interface.ts',
    ENUM: '[name].enum.ts',
    TYPE: '[name].type.ts'
  }
};

/**
 * Quy tắc đặt tên thư mục
 */
export const FOLDER_NAMING_CONVENTION = {
  // Sử dụng kebab-case
  CORRECT: [
    'user-profile',
    'product-list',
    'auth-service'
  ],
  
  // Tránh những cách đặt tên này
  INCORRECT: [
    'userProfile',    // Không dùng camelCase
    'ProductList',    // Không dùng PascalCase
    'auth_service'    // Không dùng snake_case
  ]
};

/**
 * Độ sâu thư mục tối đa được khuyến nghị
 */
export const MAX_FOLDER_DEPTH = 4;

/**
 * Ví dụ về cấu trúc feature module
 */
export const FEATURE_MODULE_EXAMPLE = {
  name: 'product',
  structure: {
    components: {
      'product-list': {
        files: [
          'product-list.component.ts',
          'product-list.component.html',
          'product-list.component.scss',
          'product-list.component.spec.ts'
        ]
      }
    },
    services: {
      files: [
        'product.service.ts',
        'product-api.service.ts'
      ]
    },
    models: {
      files: [
        'product.interface.ts',
        'product-type.enum.ts'
      ]
    },
    pages: {
      'product-list-page': {
        files: [
          'product-list-page.component.ts',
          'product-list-page.component.html'
        ]
      }
    }
  }
}; 