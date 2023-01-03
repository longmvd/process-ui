CREATE DEFINER = 'root'````@'````localhost'
PROCEDURE `misa.web10.nsdh.mdlong`.Proc_jobposition_Insert(IN `````@JobPositionID````` char(36), IN `````@JobPositionName````` varchar(255), IN `````@Description````` varchar(255), IN `````@CreatedDate````` datetime, IN `````@CreatedBy````` varchar(100), IN `````@ModifiedDate````` datetime, IN `````@ModifiedBy````` varchar(100))
  COMMENT '
  -- Author:        MDLONG
  -- Created date:  31/12/2022
  -- Description:   Thêm mới vị trí
  -- Modified by:
  -- Code chạy thử: CALL `misa.web10.nsdh.mdlong`.Proc_jobposition_Insert(UUID(),P008, Phòng Test, '', Currdate(), `````@CreatedBy`````, null, null);'
BEGIN
  INSERT INTO jobposition (JobPositionID, JobPositionName, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, Description)
    VALUES (`````@JobPositionID`````, `````@JobPositionName`````, `````@CreatedDate`````, `````@CreatedBy`````, `````@ModifiedDate`````, `````@ModifiedBy`````, `````@Description`````);
END

($"HoTiengViet.txt") ((($"TenDemNam.txt") ($"TenNam.txt"))|(($"TenDemNu.txt") ($"TenNu.txt")))


CREATE PROCEDURE get_users(
  IN `@page` INT,
  IN `@pageSize` INT,
  IN `@departmentId` CHAR(36),
  IN `@positionId` CHAR(36),
  IN `@roles` VARCHAR(255),
  IN `@keyword` VARCHAR(255),
  IN `@sortColumn` VARCHAR(255),
  IN `@sortOrder` VARCHAR(255)
)
BEGIN
  DECLARE @totalRows INT;

  SELECT COUNT(*) INTO @totalRows
  FROM user
  WHERE (`@departmentId` IS NULL OR `@departmentId` = user.DepartmentID)
  AND (`@positionId` IS NULL OR `@positionId` = user.PositionID)
  AND (`@roles` IS NULL OR `@roles` IN (
    SELECT role.RoleName FROM userrole
    INNER JOIN role ON userrole.RoleID = role.RoleID
    WHERE userrole.UserID = user.UserID
  ))
  AND (`@keyword` IS NULL OR CONCAT(user.UserName, ' ', user.Email) LIKE CONCAT('%', `@keyword`, '%'));

  SET @query = CONCAT('
    SELECT user.*, department.Name AS DepartmentName, jobposition.Name AS JobPositionName, GROUP_CONCAT(role.RoleName SEPARATOR ", ") AS Roles, ', @totalRows, ' AS totalRows
    FROM user
    INNER JOIN department ON department.DepartmentID = user.DepartmentID
    INNER JOIN jobposition ON jobposition.JobPositionID = user.JobPositionID
    LEFT JOIN userrole ON userrole.UserID = user.UserID
    LEFT JOIN role ON role.RoleID = userrole.RoleID
    WHERE (`@departmentId` IS NULL OR `@departmentId` = user.DepartmentID)
    AND (`@positionId` IS NULL OR `@positionId` = user.PositionID)
    AND (`@roles` IS NULL OR `@roles` IN (
      SELECT role.RoleName FROM userrole
      INNER JOIN role ON userrole.RoleID = role.RoleID
      WHERE userrole.UserID = user.UserID
    ))
    AND (`@keyword` IS NULL OR CONCAT(user.UserName, " ", user.Email) LIKE CONCAT("%", `@keyword`, "%"))
    GROUP BY user.UserID
    ORDER BY ', `@sortColumn`, ' ', `@sortOrder`, '
    LIMIT ', `@pageSize`, ' OFFSET ', (`@page` - 1) * `@pageSize`, '
  ');

  PREPARE stmt FROM @query;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END

CALL insert_users(
  '("user1", "userCode1", "User 1", "department1", "position1", "user1@example.com", 1, NOW(), "admin"), ("user2", "userCode2", "User 2", "department2", "position2", "user2@example.com", 1, NOW(), "admin")',
  '("user1", "role1"), ("user1", "role2"), ("user2", "role1")'
);




CREATE TABLE user (
  UserID char(36) NOT NULL DEFAULT '' COMMENT 'ID của người dùng',
  UserCode varchar(20) NOT NULL DEFAULT '' COMMENT 'Mã người dùng',
  UserName varchar(100) NOT NULL DEFAULT '' COMMENT 'Tên người dùng',
  DepartmentID char(36) NOT NULL DEFAULT '' COMMENT 'ID Phòng ban',
  JobPositionID char(36) NOT NULL DEFAULT '' COMMENT 'ID vị trí',
  Email varchar(50) NOT NULL DEFAULT '' COMMENT 'Email người dùng',
  Status tinyint NOT NULL COMMENT 'Trạng thái',
  CreatedDate datetime DEFAULT NULL COMMENT 'Ngày tạo',
  CreatedBy varchar(100) DEFAULT NULL COMMENT 'Tạo bởi',
  ModifiedDate datetime DEFAULT NULL COMMENT 'Ngày sửa',
  ModifiedBy varchar(100) DEFAULT NULL COMMENT 'Sửa bởi',
  PRIMARY KEY (UserID)
)

CREATE TABLE role (
  RoleID char(36) NOT NULL DEFAULT '',
  RoleName varchar(255) NOT NULL DEFAULT '' COMMENT 'Tên vai trò',
  Description varchar(500) DEFAULT NULL COMMENT 'Mô tả',
  CreatedDate datetime DEFAULT NULL COMMENT 'Ngày tạo',
  CreatedBy varchar(100) DEFAULT NULL COMMENT 'Tạo bởi',
  ModifiedDate datetime DEFAULT NULL COMMENT 'Ngày sửa',
  ModifiedBy varchar(100) DEFAULT NULL COMMENT 'Sửa bởi',
  PRIMARY KEY (RoleID)
)

CREATE TABLE userrole (
  UserID char(36) NOT NULL DEFAULT '' COMMENT 'ID người dùng',
  RoleID char(36) NOT NULL DEFAULT '' COMMENT 'ID vai trò',
  PRIMARY KEY (UserID, RoleID)
)


CREATE DEFINER = 'root'@'localhost'
PROCEDURE `misa.web10.nsdh.mdlong`.Proc_user_SelectFilter(
    IN `@JobPositionID` CHAR(36),
    IN `@DepartmentID` CHAR(36),
    IN `@RoleIDs` CHAR(36),
    IN `@Keyword` VARCHAR(255),
    IN `@SortColumn` VARCHAR(255),
    IN `@SortOrder` VARCHAR(4),
    IN `@Offset` INT,
    IN `@Limit` INT
)
  COMMENT '
  -- Author:        MDLONG
  -- Created date:  28/10/2022
  -- Description:   tìm kiếm phân trang nhân viên
  -- Modified by:
  -- Code chạy thử: CALL `misa.web09.ctm.mdlong`.Proc_employee_SelectFilter('');'
BEGIN
    SET @sql = CONCAT('SELECT u.UserID,
    u.UserCode,
    u.UserName,
    d.DepartmentID,
    d.DepartmentName,
    j.JobPositionID,
    j.JobPositionName,
    u.Email,
    u.Status,
    u.CreatedDate,
    u.CreatedBy,
    u.ModifiedDate,
    u.ModifiedBy,
    r.RoleID,
    r.RoleName
        FROM user u
    LEFT JOIN department d
      ON u.DepartmentID = d.DepartmentID
    LEFT JOIN jobposition j
      ON u.JobPositionID = j.JobPositionID
    LEFT JOIN userrole ur
      ON u.UserID = ur.UserID
    LEFT JOIN role r
      ON ur.RoleID = r.RoleID

        WHERE (', `@JobPositionID`, ' IS NULL OR u.JobPositionID = ''', `@JobPositionID`, ''')
            AND (', `@DepartmentID`, ' IS NULL OR u.DepartmentID = ''', `@DepartmentID`, ''')
            AND (', `@RoleIDs`, ' IS NULL OR r.RoleID = ''', `@RoleIDs`, ''')
            AND (', `@Keyword`, ' IS NULL OR ', concat(u.userCode, ' ', u.UserName, ' ', u.Email),  ' LIKE ''%', `@Keyword`, '%'')
        ORDER BY ', `@SortColumn`, ' ', `@SortOrder`, '
        LIMIT ', `@Offset`, ', ', `@Limit`, ';');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END

CREATE PROCEDURE GetUsersAndRoles(
    IN `@JobPositionID` CHAR(36),
    IN `@DepartmentID` CHAR(36),
    IN `@RoleIDs` CHAR(36),
    IN `@Keyword` VARCHAR(100),
    IN `@SortColumn` VARCHAR(50),
    IN `@SortOrder` VARCHAR(4),
    IN `@Offset` INT,
    IN `@Limit` INT,
    OUT `@TotalRows` INT
)
  COMMENT '
  -- Author:        MDLONG
  -- Created date:  28/10/2022
  -- Description:   tìm kiếm phân trang nhân viên
  -- Modified by:
  -- Code chạy thử: CALL `misa.web09.ctm.mdlong`.Proc_employee_SelectFilter('');'
BEGIN
    SET @sql = CONCAT(
        'SELECT u.UserID,
    u.UserCode,
    u.UserName,
    d.DepartmentID,
    d.DepartmentName,
    j.JobPositionID,
    j.JobPositionName,
    u.Email,
    u.Status,
    u.CreatedDate,
    u.CreatedBy,
    u.ModifiedDate,
    u.ModifiedBy,
    r.RoleID,
    r.RoleName
        FROM user u
    LEFT JOIN department d
      ON u.DepartmentID = d.DepartmentID
    LEFT JOIN jobposition j
      ON u.JobPositionID = j.JobPositionID
    LEFT JOIN userrole ur
      ON u.UserID = ur.UserID
    LEFT JOIN role r
      ON ur.RoleID = r.RoleID WHERE 1=1'
    );
    IF `@JobPositionID` IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND u.JobPositionID = ''', `@JobPositionID`, '''');
    END IF;
    IF `@DepartmentID` IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND u.DepartmentID = ''', `@DepartmentID`, '''');
    END IF;
    IF `@RoleIDs` IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND r.RoleID IN (', `@RoleIDs`, ')');
    END IF;
    IF `@Keyword` IS NOT NULL THEN
        SET @sql = CONCAT(@sql, ' AND (u.UserName LIKE ''%', `@Keyword`, '%'' OR u.UserCode LIKE ''%', `@Keyword`, '%'' OR u.Email LIKE ''%', `@Keyword`, '%'')');
    END IF;
    SET @sql = CONCAT(@sql, ' ORDER BY ', `@SortColumn`, ' ', `@SortOrder`, ' LIMIT ', `@Offset`, ', ', `@Limit`);

    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    SET @sql = CONCAT('SELECT COUNT(*) AS TotalRows FROM (', @sql, ') t');
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END
