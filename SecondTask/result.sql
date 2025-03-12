WITH RecursiveSubdivisions AS (
    SELECT 
        subdivisions.id AS subdivision_id,          
        subdivisions.name AS subdivision_name,      
        subdivisions.parent_id AS parent_subdivision_id, 
        0 AS subdivision_level                      
    FROM subdivisions
    WHERE subdivisions.id = (                       
        SELECT collaborators.subdivision_id 
        FROM collaborators 
        WHERE collaborators.id = 710253              
    )

    UNION ALL

    SELECT 
        child_subdivisions.id AS subdivision_id,   
        child_subdivisions.name AS subdivision_name,
        child_subdivisions.parent_id AS parent_subdivision_id, 
        parent_subdivisions.subdivision_level + 1 AS subdivision_level  
    FROM subdivisions AS child_subdivisions
    INNER JOIN RecursiveSubdivisions AS parent_subdivisions 
        ON child_subdivisions.parent_id = parent_subdivisions.subdivision_id  
),

SubdivisionEmployeeCount AS (
    SELECT 
        collaborators.subdivision_id AS subdivision_id, 
        COUNT(*) AS employees_count                    
    FROM collaborators
    GROUP BY collaborators.subdivision_id               
)

SELECT 
    collaborators.id AS employee_id,                  
    collaborators.name AS employee_name,              
    RecursiveSubdivisions.subdivision_name,            
    RecursiveSubdivisions.subdivision_id,              
    RecursiveSubdivisions.subdivision_level,           
    COALESCE(SubdivisionEmployeeCount.employees_count, 0) AS employees_count 
FROM collaborators
INNER JOIN RecursiveSubdivisions 
    ON collaborators.subdivision_id = RecursiveSubdivisions.subdivision_id  
LEFT JOIN SubdivisionEmployeeCount 
    ON collaborators.subdivision_id = SubdivisionEmployeeCount.subdivision_id  
WHERE collaborators.age < 40                        
AND RecursiveSubdivisions.subdivision_id NOT IN (100055, 100059)  
ORDER BY RecursiveSubdivisions.subdivision_level ASC;