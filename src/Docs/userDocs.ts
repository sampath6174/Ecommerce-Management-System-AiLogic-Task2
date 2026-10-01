/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 */

/**
 * @swagger
 * /api/users/customers:
 *   get:
 *     summary: Get all customers
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customers retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 */

/** 
 * @swagger
 * /api/users/customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       404:
 *         description: Customer not found
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/create/staff:
 *   post:
 *     summary: Create a new staff
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - username
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John1
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               username:
 *                 type: string
 *                 example: john
 *               password:
 *                 type: string
 *                 example: John@123
 *     responses:
 *       201:
 *         description: Staff created successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       400:
 *         description: Invalid request
 */

/**
 * @swagger
 * /api/users/refresh-token:
 *   post:
 *     summary: Generate a new access token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Valid refresh token
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *       401:
 *         description: Invalid or expired refresh token
 */
/**
 * @swagger
 * /api/users/staff:
 *   get:
 *     summary: Get all staff users
 *     description: Returns all users with the USER role. Accessible only to Admin.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Staff users retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 */