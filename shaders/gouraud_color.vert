#version 300 es

precision highp float;

in vec3 vertex_position;
in vec3 vertex_normal;

uniform vec3 light_ambient;
uniform vec3 light_position;
uniform vec3 light_color;
uniform vec3 camera_position;
uniform float material_shininess; // n
uniform mat4 model_matrix;
uniform mat4 view_matrix;
uniform mat4 projection_matrix;

out vec3 ambient;
out vec3 diffuse;
out vec3 specular;

void main() {
    gl_Position = projection_matrix * view_matrix * model_matrix * vec4(vertex_position, 1.0);

    ambient = max(light_ambient, 0.0);

    vec3 pos = vec3(model_matrix * vec4(vertex_position, 1));
    vec3 light_vector = normalize(light_position - pos);
    vec3 normalized = normalize(vertex_normal);
    diffuse = max(light_color * max(dot(normalized, light_vector), 0.0), 0.0);
    
    vec3 view_vector = normalize(camera_position - pos);
    vec3 reflection_vector = normalize(reflect(-light_vector, normalized));
    specular = max(light_color * pow(max(dot(reflection_vector, view_vector), 0.0), material_shininess), 0.0);
}
